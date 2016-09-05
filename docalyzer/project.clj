(defproject docalyzer "0.1.0-SNAPSHOT"
  :description "FIXME: write description"
  :url "http://example.com/FIXME"
  :license {:name "Eclipse Public License"
            :url "http://www.eclipse.org/legal/epl-v10.html"}
  :dependencies [[org.clojure/clojure "1.8.0"]
                 [org.apache.pdfbox/pdfbox "2.0.0"]
                 [clojurewerkz/machine_head "1.0.0-beta9"]
                 [cc.qbits/alia-all "3.1.11"]
                 [cc.qbits/hayt "3.0.1"]
                 [org.clojars.clizzin/jsoup "1.5.1"]
                 [com.taoensso/timbre "4.7.4"]
                 [org.clojure/tools.reader "1.0.0-beta3"]]
  :main ^:skip-aot docalyzer.core
  :target-path "target/%s"
  :profiles {:uberjar {:aot :all}})
