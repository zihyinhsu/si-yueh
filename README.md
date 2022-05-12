# 徙閱二手書

![](https://storage.googleapis.com/vue-course-api.appspot.com/zy123/1651492574560.png?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=WqgKVjLquLlKAp4OkrMkkt3GIbn%2BG0A%2FHnPORJ0miSQIc8dSOmTuVHVAeixUGVOMbh0hoisZH4eV614pu5Ke2Zwy1luBb%2FxjS4SThrgnYumgmDACYIBUT6HgH%2Ftrsba7joIRu%2F6genLN6Eoy%2FoswjMT%2B%2FTgAL6RYdLmss8orGKs7EyGys2eQ0cogdFKgNiSwvTVFYiPchV2aLkvux8XFFFJTdpPgSKv8qY0z%2Fkzgh2qW6lwnHWuKf8Rb3o9KX62%2FihqsGAI4eGc1sNulGMlagpSLXra4Lf1oORsEWa2V9zM11J5CuOjT3AHC9FLtic%2BlBhaxH5Vhhz8zvCKe3Jy5DA%3D%3D)
## 專案說明
 > Demo Website : [https://zihyinhsu.github.io/si-yueh/](https://zihyinhsu.github.io/si-yueh/#/)

以二手書電商為主題的 SPA 網站。

商品文案來源 : [博客來](https://www.books.com.tw/?gclid=Cj0KCQjwvLOTBhCJARIsACVldV3dwbmpMMWLlaSQBn3bGP1utDcLgS4swc5r2Vs-bwmWHeEzqA5HJu4aAghKEALw_wcB)

圖片來源： [Unsplash](https://unsplash.com/)、 [Readmoo](https://readmoo.com/)

---
### 使用技術
- 以 `Vue 3` 與 `Vue Cli` 架設開發。
- 使用 `Bootstrap 5` 作為 CSS 框架，以進行切版。
- 加入 `ESLint standard` 統一程式碼結構。
- 使用 `Pinia.js` 傳遞跨元件資料，作為狀態管理工具。

### 使用套件
- `Vue 3`
- `Vue Cli`
- `Vue Router`
- `Vue Axios`
- `vue-loading-overlay`
- `vue-skeletor`
- `vue.draggable.next`
- `Vee Validation`
- `pinia`
- `Bootstrap 5`
- `lodash`
- `Swiper`
- `CKEditor 5`
- `Font Awesome`、`Material icons`
## 前台簡介

### 首頁
![](https://storage.googleapis.com/vue-course-api.appspot.com/zy123/1651493528047.png?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=hd7OhPJp%2Fu2rJ8qKDDecqqn%2B5y4eyye1AuoEapcxdtDWvy3FKxHFXAvg1UcXGkJFbGCxlhiJFHH4GLlaFdb74VUkDuvYM75Xy9V%2FkarnNS0v6MMP4PQAwppy2Tz38C6XrdhamWhwqHhfmCDi0JB0JWbgf3Kra1SwIVbcLHsNr0zK0NiECqefN6dwS53Q5iGzi3bW%2FWXh%2BV56emrCV17eWRH%2FrIE%2FP%2FG%2FguP2jTHnIb0vc6JBH8GXVAsN7xbVda9uuJbtYOhN68682lvEbUfngVFxcVJK1zYAcTHqvh5bm4qCNbDY%2BBX2rfzxYL9H6XtLpUZVI%2BqKwAykSIt%2FUgBgMA%3D%3D)

### 商品列表
![](https://storage.googleapis.com/vue-course-api.appspot.com/zy123/1651493567085.png?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=BHUgmGPa470pvbXMSIClssObfBH6cIhiNV4lX6Znp7q76EjuJ7fCiZzxeb7RSn%2FjRpie7jAFJmvRw0pota8wRsgXpYq9lgLutbUYdCki%2BsOsW3HiQk4gEyOeSLn%2FEZKd91A2PegZP0u1n1kz4v8Asl1f3Hj%2FvOx3wze1qdU9izjtIZH%2BtpPDw3UfUKGKgHhjKu2M8rjk4qreNs4zNfff2oDzhKo%2Bk3jqoy2CTC4yVPMI1%2BwHsYIU0A%2BK%2FPrhStt3EPMVu%2FMeEll5y54WuYmcuCmrKjfen4kDhbYyJjdSc2GO81idsQJ1m9h5j0iaG1QYDygPqw1o2JrbqSYr4OW1FA%3D%3D)

### 商品詳情
![](https://storage.googleapis.com/vue-course-api.appspot.com/zy123/1651494485588.png?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=nD4SmAnuaczt%2BOVwXAoNfhZxRSBbsQownkT%2BlQ%2BnJSLsDxVkYiByAztn1Msy5IOf%2BivzNU8P1V%2BY7wlEaKI7a1Wu5hcxKZPe6XRfxtV99R2fA7QNrK2EkwMqJKqckJHFqOnyhfIegTFoWNE3KUy%2Ft4OspgAww9TEPoijpImNWBqR%2BneON44mkKp5t%2B113jvUf%2BL4NLhOgVt6p9QKp%2FQu44%2FP78daTC67KBmzt%2BWzT9H9e748rD4MPyBlG2K6RtOmDGG6RgoXc4Do904JcEwn9CuHv0G8ZHuwodiXp5UBckXn8iLjWHsyS1chbTYvlnz2JXlOBVyzN0X4LVGpupQBgg%3D%3D)

### 搜尋 與 篩選功能
![](https://i.imgur.com/tFGvQed.gif)

### 收藏書單

使用 localStorage 來做收藏功能，並加入拖曳 與 儲存排序功能。

![](https://github.com/zihyinhsu/si-yueh/blob/master/src/assets/images/20220502_210404.gif?raw=true)

### 最近瀏覽 功能
![](https://storage.googleapis.com/vue-course-api.appspot.com/zy123/1651494375704.png?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=SETnMqoaaqccClClUFH%2BviaC6Cc%2BUv3PSz6wTlil7aQF9DnF38xSGQRlPnwBjEW0FidMc%2Bd%2FBL1k1n5tV20S%2Ba2xtdQmFb6N1tWaOLNjd8BC2%2Bap5dPSTy69Dp02MXRX4XuM0t9qNdKgdtOSwm6o%2BoM1MGmPcvVS69SJq%2BqyUJbzVjG98kuW19p8Sv8pTs%2BNKDg61HyQedLcMbQB0XbqqlmDyKGgX6bqyPnBnPLb%2BvFFEpLknTbb7gkkFB6x5XE%2BrRu3CyNjTFz3d6MlKDozsG9fp58wfKfW144WfPbRCojszb7ih9H4l83y3qWYigSi7tza%2Ff5Ts1kxoEO0t811HQ%3D%3D)

## 後臺簡介

### 商品管理
![](https://storage.googleapis.com/vue-course-api.appspot.com/zy123/1651494735090.png?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=LgSgvIOTSBOvK1HeVqkgQaz2EmWF9lkDeso4xd6r%2BavgN12wpEwLhegeIf7omBmU%2Bhlz3IZ6J%2FVK6fpjI5XOXfJvgpwWQYpS4YqwHLgMowXZJFBbUPyIu361u9tlFLcznhzeNgFkhj95dPescGXhMt71CeT22inJG65PHNXevJ%2BH4p2FhLmYx0R8WTtwABw5fhy4kN3Z48TDSXmXPtYRE95W15ooGlKJKKUE9HiSAUliwMKd3KwgNN8v1Bf%2F74b%2BIZV8R40kRiQmPmHAkowxuiI4MnIul3o8B6YQVL5X6%2BgcneFm%2F3BjXk2SRl9wMG2JO%2FeudvqXf20sZGtYLAhS%2Bw%3D%3D)

![](https://storage.googleapis.com/vue-course-api.appspot.com/zy123/1651495054913.png?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=azlZpKe9y4ySHsNiqGs4N5afmL6zNx9pBrGQES5KAd%2FrgBohkFCwlN6Jb80hfTnS4hk8UlntXb9EJI9qw6Q%2FDMAe54QHQj%2F%2F65VcJgMSCUBWFCYphyGrAP2LM5ET3TIcB8HXgRwuv%2Bc8X7EYwYJfKt4raGIgTNSGA%2BOBuBt3G1f0xkHoExvGLbrgeiQL573RrRYBNheS4JtZ0ILyXnXRroBFy0Zl9qssEzfpsx8okZWKgMW264UUiEhYlN49aykCdPpdmTKwzOwwNVscc9rai00MRDXsi15kmel9r%2FE%2Bht3sNHzElBlNTC4kJSF1mz0IkQmr%2BS3xVvzCqSV%2FfaczmQ%3D%3D)

#### 使用 `CKEditor` 做內文排版
![](https://storage.googleapis.com/vue-course-api.appspot.com/zy123/1651495101051.png?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=FwI2R%2BOD3wylzzxc3eBdDIqacnux2my7gAvsGcSVsEFl0%2FIWOV3tP3iXwm%2FlPLghnxSJ3W0Zu1D0EcALO8UfemIWfzX4M1VgVUR0UXRw3dPXbAyAibffFph2XaT%2FX4xmXHxQrr3%2FXpuYaZKl%2FLgMJtrxDkF6GORzqajowR3bskA8sK3zCazfCOtuvD0YyVDMKhUxB9CQaUBUTuUCj0%2BIjFrKRiE22AtV6S2Eh%2B%2Bnam5%2FPCxCqI0qIsqXgrfisp9eXowgMyVn79GdXKlmTQQYlj3UnS8VW5Wd1OiRQ5Xtm8WOp%2FRhFw5zufXt6nq2E0v4NkGi%2BzecqlAWsJFnr7aBgA%3D%3D)

![](https://storage.googleapis.com/vue-course-api.appspot.com/zy123/1651495118637.png?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=GSV4n71PTr%2BmAcz1aVxeruEYYXuRteo45t%2Bhuv58e%2F2uHpMhxi239GnR4nAILEd39iZCsTiKUTZfCEzSiZp%2Bju%2FWP7Wd0w6rZwULSMm%2F1LT%2Fs5jKFjY4bcGdPN0KwrJS0y1jJ4UWfkQwbmIwNgghoHDD5YJ5AAfhCjWoIJUmHxXSzOmlOc1b1v%2BFQSsa5Eq84%2BR8HHx1AVxCIzIuA6vRrajWNjHScZ%2BFFl0RKDgKZvkogJai1kAghNy6yYP%2B8peuCy2aBEKI77VTpeM2nfLS1i0l%2Bd3S5a72Yo6ruceXoattMkP89AlfGE%2BJRxZ4TETLbZNGxzxmPObhA7s1BSRHAg%3D%3D)

### 訂單管理

可以在訂單頁面更改出貨狀態。

![](https://storage.googleapis.com/vue-course-api.appspot.com/zy123/1651495667603.png?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=eJ2xci%2BtIwXGYFeR6Uzlo%2FtALjqIO7ICfo7nDnn2W%2FmUPr9FCixdPHBW6MOGCkqxOLzXzUydKwyl%2F5N6cZbHQDpM2tpFLBr4lik%2BAL1gE7ZhOyASY44MUZmKBHjfQ2b8mpE7%2Be3zPD0y1kPSyArXLx6h2yLNUaBELBH8kyTVLihPKiF1rt5RM7nVtW7DJW0vt3wSuWhgcf7tjjfhFH4TNelV%2F3r4KvY8dVtwzwRmvWxWe1uFlKq%2BjqJSQDc%2B9QMPbKWKzOShARm6Nrk7vK9qCGYevMfCDmeZTTQ3Suao8B%2BAwge7nC9%2FMXbPxSeKCMUcUOnHbxFAKXy5Bq8X3FPxFQ%3D%3D)
