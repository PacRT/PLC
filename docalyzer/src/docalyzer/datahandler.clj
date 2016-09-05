(ns docalyzer.datahandler
  (:gen-class)
  (:require [qbits.alia :as client])
  (:require [qbits.hayt :as hayt])
  (use clojure.walk))

(def cluster (client/cluster {:contact-points ["localhost"]}))

(def session (delay (client/connect cluster)))

(defn get-id-by-doc-link [doc_link]
  (try
    (println "get-id-by-doc-link [doc_link] - is called ")
    (:id (first (client/execute @session
      (str "SELCT id from docs where doc_link = '" doc_link "' allow filtering"))))
    (catch Exception e (str "Exception in executing query contining doc_link: "
   doc_link "=>" (.getMessage e)))))

(defn get-id-by-doc-url [doc_url]
  (try
    (println "get-id-by-doc-url [doc_link] - is called ")
    (:id (first (client/execute @session
      (str "SELCT id from docs where doc_url = '" doc_url "' allow filtering"))))
    (catch Exception e (str "Exception in executing query contining doc_url: "
   doc_url "=>" (.getMessage e)))))


(defn update-price [doc_link price]
  (try
    (println "update-price [doc_link price] - is called ")
    (def id (get-id-by-doc-link doc_link))
    (println (str "id(doc): " id))
    (client/execute @session
      (str "UPDATE docs SET meta_fields['guessed_price'] ='" price "' where id = " id))
    (catch Exception e (str "Issues updating price: " (.getMessage e)))))

(defn update-suggestive-text [doc_link text]
  (try
    (println "update-suggestive-text [doc_link text] - is called ")
    (def id (get-id-by-doc-link doc_link))
    (println (str "id(doc): " id))
    (client/execute @session
      (str "UPDATE docs SET meta_fields['suggestive_text'] ='" text "' where
        id = " id ))
    (catch Exception e (str "Issues updating suggestive-text: " (.getMessage e)))))


(defn get-sender-info
  "key: is mostly the uri/url. Look up the appropriate tables to gather sender
  info. Create a map with key :category-scores with a nested map with Category
  as the key and score as the value - multiple categories are possible - one
  Category is desirable, no Cateogory is allowed too "
  [doc_link]
  (try
    (:issuer_id (first (client/execute @session
      (str "SELECT issuer_id from docs where doc_link = '" doc_link "' ALLOW FILTERING"))))
    (catch Exception e (str "Issues getting sender-info from doc_link: "
      doc_link " =>" (.getMessage e)))))
  ;;(def ids-links (client/execute @session
  ;;"SELECT issuer_id, doc_link FROM docs;"))
  ;;(:issuer_id (first (filter #(= (:doc_link %) doc_link) ids-links))))
  ;; "SELECT issuer_id from doc where doc_link = doc_link allow filtering"

(defn get-category-score-map [email]
  (keywordize-keys (:category_score (first (client/execute @session (str "SELECT category_score email_category where
        email = '" email "' ALLOW FILTERING"))))))

(defn get-whole-mime-data
  "MIME data may become useful in certain types of deep analysis"
  [doc_link])
