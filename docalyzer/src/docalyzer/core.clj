(ns docalyzer.core
  (:gen-class)
  (:import [org.apache.pdfbox.pdmodel PDDocument]
          [org.apache.pdfbox.text PDFTextStripper])
  (require [clojure.string :as str])
  (require [clojure.java.io :as io])
  (:require [clojurewerkz.machine-head.client :as mh])
  (use [clojure.java.shell :only [sh]])
  (:import [org.jsoup Jsoup]
          [org.jsoup.nodes Document]))

(defn text-of-pdf [url]
 (with-open [pd (PDDocument/load url)]
   (let [stripper (PDFTextStripper.)]
    (.getText stripper pd))))

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
  (str/split
    (.text (.body doc)) #"\n"))

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

(defn listen [topic]
  (let [conn (mh/connect "tcp://127.0.0.1:1883" (str (rand-int 99999)))]
    (if (mh/connected? conn)
      (do
        (mh/subscribe conn {topic 0}
          (fn [^String topic _ ^bytes payload]
            (do
              (println "here we are")
              (println (String. payload "UTF-8"))
              (let [text-list
                    (cond
                      (= topic "new.pdf") (pdf-to-text-list (io/input-stream (.trim (String. payload "UTF-8"))))
                      (= topic "new.html") (html-to-text-list (slurp (.trim (String. payload "UTF-8"))))
                      :else (throw (Exception. "not a supported topic")))
                    guessed-total
                    (guess-total text-list)
                    meta-text (find-text-containing-price text-list)]
                (println "Guessed total: " guessed-total)
                (doall (map println meta-text)))
              (flush))))))))

(defn -main
  "I'm the main and I should, probably, exist in production environment."
  [& args]
  (def text-list
    (pdf-to-text-list
      (io/input-stream "/Users/chiradip/Downloads/BH_542220530.pdf")))
  (println (guess-total text-list))
  (def texts (find-text-containing-price text-list))
  (println (str/join "\n" (doall (map #(do %)  texts)))) (flush)
  (doall (map println (html-to-text-list (slurp "my.html"))))
  (.start (Thread. (fn [] (listen "new.html"))))
  (.start (Thread. (fn [] (listen "new.pdf")))))
