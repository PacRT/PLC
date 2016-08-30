(ns docalyzer.datahandler
  (:require [clojurewerkz.cassaforte.client :as client]))

(def session (delay (client/connect ["127.0.0.1"] {:keyspace "plc" :protocol-version 2})))

(defn update-price [key, price]
  (client/execute session
    (str "UPDATE docs SET meta_fields['guesed_price'] ='" price "';")))

(defn update-suggestive-text [key, text]
  (client/execute session
    (str "UPDATE docs SET meta_fields['suggestive_text'] ='" text "';")))

(defn get-sender-info
  "key: is mostly the uri/url. Look up the appropriate tables to gather sender
  info. Create a map with key :category-scores with a nested map with Category
  as the key and score as the value - multiple categories are possible - one
  Category is desirable, no Cateogory is allowed too "
  [key]
  (client/execute session
    (str "SELECT issuer_id FROM docs WHERE doc_url = '" key "';")))

(defn get-whole-mime-data
  "MIME data may become useful in certain types of deep analysis"
  [key])
