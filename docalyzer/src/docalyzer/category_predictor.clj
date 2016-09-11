(ns docalyzer.category-predictor
  (:gen-class)
  (:require [docalyzer.datahandler :as dh]))

(defn predict-category-from-email
 "Email address can be found using the key from the database
- returns a map of ctaegory and score (between 1 to 100)"
  [doc_link]
  (try
    (let [issuer-id (dh/get-sender-info doc_link)
          score-map (first (sort-by val > (dh/get-category-score-map issuer-id)))
          top-score (val score-map)
          top-category (key score-map)]
          (if (and (not (nil? top-score)) (> top-score 69)) top-category nil))
    (catch Exception e (str "Issues in predict-category-from-email: " (.getMessage e)))))

(defn update-all-categories-by-email []
  (map
    (fn [x]
      (println (str "Element: " x))
      (let [doc_link (:doc_link x)
            id (:id x)
            category (predict-category-from-email doc_link)]
            (println (str "doc_link: " doc_link "id: " id "category: " category))
            (if (not (nil? category))
              (dh/update-category-by-id id category))))
    (dh/get-all-ids-doclinks)))

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
