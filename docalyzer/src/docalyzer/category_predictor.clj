(ns docalyzer.category-predictor
  (:gen-class)
  (:require [clojurewerkz.cassaforte.client :as client])
  (:require [docalyzer.datahandler :as dh]))

(defn predict-category-from-email
 "Email address can be found using the key from the database
- returns a map of ctaegory and score (between 1 to 100)"
  [doc_link]
  (try
    (let [issuer-id (dh/get-sender-info doc_link)]
      ;; TODO: do it soon 
      )
    (catch Exception e (str "Issues in predict-category-from-email: " (.getMessage e)))))

(defn predict-category-from-content
 "Raw content can be found from database but to reduce processing time, use the
already transformed content - returns a map of category and score
(between 1 to 100)"
  [{content :content key :key}])

(defn predict-category [{key :key content :content sub :sub}]
  (def email-score-map (predict-category-from-email key))
  (def content-score-map (delay (predict-category-from-content {:key key :content content})))
  (def merged-score-map (delay (merge-with + email-score-map @content-score-map)))
  (def email-max-score (apply max-key val email-score-map))
  (def merged-max-score (delay apply max-key val @merged-score-map))
  (if
    (= 100 (val email-max-score))
    (key email-max-score) (key @merged-max-score)))
