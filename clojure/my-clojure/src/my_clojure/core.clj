(ns my-clojure.core)

(def filename "suspects.csv")
(def vamp-keys [:name :glitter-index])
(defn str->int
  [str]
  (Integer. str))

(def conversions {:name identity
                  :glitter-index str->int})

(defn convert
  [vamp-key value]
  ((get conversions vamp-key) value))

(convert :glitter-index "3")

(defn parse
  [string]
  (map #(clojure.string/split % #",")
       (clojure.string/split string #"\n")))

(defn mapify
  [rows]
  (map (fn [unmapped-row]
         (reduce (fn [row-map [vamp-key value]]
                   (assoc row-map vamp-key (convert vamp-key value)))
                 {}
                 (map vector vamp-keys unmapped-row)))
       rows))

(first (mapify (parse (slurp filename))))

(defn glitter-filter
  [minimum-glitter records]
  (filter #(>= (:glitter-index %) minimum-glitter) records))

(glitter-filter 3 (mapify (parse (slurp filename))))

; demo1
(defn dec-maker
  "entry number to create dec function"
  [dec-number]
  #(- %1 dec-number))

(def dec9 (dec-maker 9))
(dec9 10)

; demo2
(defn mapset
  "entry fn and vector return set"
  [fn arr]
  (loop [remaing arr
         result []]
    (if (empty? remaing)
      (set result)
      (let [[first & remaing] remaing]
        (recur remaing
               (conj result (fn first)))))))

(mapset inc [1 1 2 2])

; demo2-1
(defn mapset
  "entry fn and vector return set"
  [fn arr]
  (set (map fn arr)))

(mapset inc [1 1 2 2])

(ns the-divine-cheese-code.visualization.svg
  (:require [clojure.string :as s])
  (:refer-clojure :exclude [min max]))

(defn comparator-over-maps
  [comparison-fn ks]
  (fn [maps]
    (zipmap ks
            (map (fn [k] (apply comparison-fn (map k maps)))
                 ks))))

(def min (comparator-over-maps clojure.core/min [:a :b]))
(def max (comparator-over-maps clojure.core/max [:a :b]))
(min [{:a 1 :b 3} {:a 5 :b 0}])

(defmacro backwards
  [form]
  (reverse form))

(backwards (" backwards" " am" "I" str))
