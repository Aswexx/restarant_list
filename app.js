const express = require('express');
const app = express();
const port = 3000;
const exphbs = require('express-handlebars');

// 取得餐廳資料
const restaurantList = require('./restaurant.json')


// 樣板引擎設置
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

// 使用靜態檔案
app.use(express.static('public'))

// 路由

app.get('/', (req, res) => {
  res.render('index', { restaurants: restaurantList.results });
})

app.get('/restaurants/:id', (req, res) => {
  const reqId = req.params.id
  const matchedRestaurant = restaurantList.results.find(rtr => 
    rtr.id.toString() === reqId
  )
  res.render('show',{restaurant: matchedRestaurant})
})

    //// 關鍵字搜尋符合店名或類別就顯示
app.get('/search', (req, res) => {
  const keyword = req.query.keyword
  const fixedKeyword = req.query.keyword.toLowerCase().replaceAll(' ','')
  const filteredRestaurants = restaurantList.results.filter(rtr =>
    rtr.name.toLowerCase().replaceAll(' ','').includes(fixedKeyword) ||
    rtr.category.toLowerCase().replaceAll(' ', '').includes(fixedKeyword));
    
  res.render('index',{ restaurants: filteredRestaurants , keyword: keyword})
})

//

// 監聽伺服器
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
});