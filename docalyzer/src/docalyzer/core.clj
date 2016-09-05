(ns docalyzer.core
  (:gen-class)
  (:import [org.apache.pdfbox.pdmodel PDDocument]
          [org.apache.pdfbox.text PDFTextStripper])
  (require [clojure.string :as str])
  (require [clojure.java.io :as io])
  (:require [clojurewerkz.machine-head.client :as mh])
  (use [clojure.java.shell :only [sh]])
  (:import [org.jsoup Jsoup]
          [org.jsoup.nodes Document])
  (require [docalyzer.datahandler :as dh])
  (require [docalyzer.category-predictor :as cp]))

(defn text-of-pdf [url]
  (try
    (with-open [pd (PDDocument/load url)]
      (let [stripper (PDFTextStripper.)]
        (.getText stripper pd)))
    (catch Exception e (str "Problem reading/opening pdf: " (.getMessage e)))))

(def price-pattern (re-pattern "\\d{1,3}(?:[.,]\\d{3})*(?:[.,]\\d{2,3})"))

(defn detect-price [text]
  (re-find price-pattern text))

(defn price-to-number [price]
  (Double. (str/replace price #"[,|\\w]" "")))

(defn remove-junk [x]
  (if
    (< 4 (.length (.trim x))) (.trim x)))

(defn pdf-to-text-list
  "byte[], File or InputStream"
  [pdf]
  (str/split
    (text-of-pdf pdf) #"\n"))

(defn html-to-text-list
  [html]
  (println "html-to-text-list is called")
  (def doc (Jsoup/parse html))
  (try
    (str/split
      (.text (.body doc)) #"\n")
    (catch Exception e (str "" (.getMessage e)))))

(defn find-text-containing-price
  "finds the text that has price but also more text"
  [text-list]
  (distinct
    (remove nil?
      (map
        (fn [x]
          (def price (detect-price x))
          (if (and (not (nil? price)) (not (= 0 (compare (.trim x) (.trim price)))))
              x))
       text-list))))

(defn find-prices-in-text-list
  [text-list]
  (distinct
    (remove nil?
      (map
        (fn [x]
          (def price (detect-price x))
          (if (not (nil? price))
              price))
       text-list))))

(comment (do
          (if
            (= 0 (compare (.trim x) (.trim price)))
            price x)))

(comment (map
          (fn [x] (price-to-number (re-find price-pattern x)))
          prices))

(defn guess-total
  "Tries to find out the occurance of the total price paid or invoiced by finding
  maximum valued price in the list"
  [text-list]
  (def prices  (find-prices-in-text-list text-list))
  (last
    (sort
      (map price-to-number prices))))

(defn ts-slurp[url]
  (try
    (println "Trying to slurp")
    (slurp url)
    (catch Exception e (str "Issues opening/readig URL: " url "=>" (.getMessage e)))))

(defn my-input-stream [url]
  (try
    (io/input-stream url)
    (catch Exception e (str "Issues opening InputStream from: " url (.getMessage e)))))

(defn listen [topic]
  (let [conn (mh/connect "tcp://127.0.0.1:1883" (str (rand-int 99999)))]
    (if (mh/connected? conn)
      (do
        (mh/subscribe conn {topic 0}
          (fn [^String topic _ ^bytes payload]
            (do
              (println "here we are")
              (println (String. payload "UTF-8"))
              (let [url (.trim (String. payload "UTF-8"))
                text-list
                    (condp = topic
                      "new.html" (do (println "processing html req")
                        (html-to-text-list (ts-slurp url)))
                      "new.pdf" (pdf-to-text-list (my-input-stream url))
                      :else (do (println "throwing exception")
                        (throw (Exception. "not a supported topic"))))
                    guessed-total
                    (do (println "are we here yet?") (guess-total text-list))
                    meta-text (find-text-containing-price text-list)]
                (println "Guessed total: " guessed-total)
                (try ;; try to post/update the price
                  (println "Trying to post/update price")
                  (dh/update-price url guessed-total)
                  (catch Exception e (str "Issues post/update-ing total: " (.getMessage e))))
                (doall (map println meta-text)))
              (flush))))))))

(defn -main
  "I'm the main and I should, probably, exist in production environment."
  [& args]
  (println "Docalyzer is ready for its Business... :)")
  (comment (def text-list
    (pdf-to-text-list
      (io/input-stream "/Users/chiradip/Downloads/BH_542220530.pdf")))
  (println (type text-list))
  (println (guess-total text-list))
  (def texts (find-text-containing-price text-list)))
  (try
    (cp/update-all-categories-by-email)
    (catch Exception e (str "Issues updating all categories.." (.getMessage e))))
  ;;(println (str/join "\n" (doall (map #(do %)  texts)))) (flush)
  ;;(doall (map println (html-to-text-list (slurp "my.html"))))
  ;;(println (guess-total (html-to-text-list (slurp "my.html"))))
  ;;(println (guess-total (html-to-text-list (slurp "my.html"))))
  (.start (Thread. (fn [] (listen "new.pdf"))))
  (.start (Thread. (fn [] (listen "new.html")))))
