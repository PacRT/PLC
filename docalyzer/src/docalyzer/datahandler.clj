(ns docalyzer.datahandler
  (:require [qbits.alia :as client])
  (:require [qbits.hayt :as hayt]))

(def cluster (client/cluster {:contact-points ["localhost"]}))

(def session (delay (client/connect cluster)))

(defn get-id-by-doc-link [doc_link]
  (:id (first (client/execute @session
    (str "SELCT id from docs where doc_link = '" doc_link "' allow filtering")))))

(defn get-id-by-doc-url [doc_url]
  (:id (first (client/execute @session
    (str "SELCT id from docs where doc_url = '" doc_url "' allow filtering")))))

(defn update-price [doc_link, price]
  (def id (get-id-by-doc-link doc_link))
  (client/execute @session
    (str "UPDATE docs SET meta_fields['guesed_price'] ='" price "' where id = " id)))

(defn update-suggestive-text [doc_link, text]
  (def id (get-id-by-doc-link doc_link))
  (client/execute @session
    (str "UPDATE docs SET meta_fields['suggestive_text'] ='" text "' where
      id = " id )))

(defn get-sender-info
  "key: is mostly the uri/url. Look up the appropriate tables to gather sender
  info. Create a map with key :category-scores with a nested map with Category
  as the key and score as the value - multiple categories are possible - one
  Category is desirable, no Cateogory is allowed too "
  [doc_link]
  (:issuer_id (first (client/execute @session
    (str "SELECT issuer_id from doc where doc_link = '" doc_link "' ALLOW FILTERING")))))
  ;;(def ids-links (client/execute @session
  ;;"SELECT issuer_id, doc_link FROM docs;"))
  ;;(:issuer_id (first (filter #(= (:doc_link %) doc_link) ids-links))))
  ;; "SELECT issuer_id from doc where doc_link = doc_link allow filtering"

(defn get-whole-mime-data
  "MIME data may become useful in certain types of deep analysis"
  [doc_link])
