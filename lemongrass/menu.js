/* Lemongrass – Kotte menu. Prices in LKR as listed on Uber Eats (Nov 2026).
   Item: [name, price | [smallPrice, largePrice], badge?, image?]
   badge: "pop" = Popular, "1" / "2" / "3" = #N most liked */
window.MENU = [
 { id: "indian", label: "Indian", cats: [
  { n: "South Indian Dosas", img: "ghee-dosai", items: [
   ["Kal Dosai (2 pcs)", 876], ["Masala Dosai", 1032, "pop"], ["Paper Dosai", 1080, "pop", "paper-dosai"], ["Ghee Dosai", 1164, 0, "ghee-dosai"],
   ["Lemongrass Special Dosai", 1428], ["Paper Masala Dosai", 1188, "pop"], ["Plain Dosai", 492], ["Chicken Masala Dosai", 1656],
   ["Tomato Onion Uttapam", 1068], ["Idli (2 pcs)", 612], ["Onion Uttapam", 1032], ["Ghee Masala Dosai", 1032],
   ["Cashew Nut Rava Dosai", 1524], ["Paneer Masala Dosai", 1584], ["Ghee Paper Masala Dosai", 1248], ["Onion Dosai", 1032],
   ["Mushroom Masala Dosai", 1428], ["Palak Masala Dosai", 1068], ["Chilli Masala Dosai", 1032] ] },
  { n: "South Indian Snacks", items: [ ["Ulundu Vadai", 288], ["Sambhar Vadai", 588], ["Vegetable Samosa", 300] ] },
  { n: "Soup", img: "sweet-corn-soup", items: [
   ["Cream of Chicken Soup", 1428, "pop"], ["Vegetable Lime and Coriander Soup", 1188], ["Vegetable Cream Soup", 1164],
   ["Lentil and Mutton Soup", 1560], ["Cream of Tomato Soup", 1104], ["Cream of Mushroom Soup", 1260] ] },
  { n: "Starters", items: [
   ["Chicken 65", 2604], ["Lemongrass Spicy Chicken", 1788, "pop"], ["Garlic Prawn Chilli", 3312], ["Paneer 65", 2304],
   ["Mutton Pepper Fry", 3420], ["Golden Fried Baby Corn", 1788], ["Golden Fried Prawns", 3312] ] },
  { n: "Tandoori", items: [
   ["Tandoori Chicken (Full)", 4812], ["Tandoori Chicken (Half)", 2604], ["Tandoori Chicken (Quarter)", 1488], ["Chicken Tikka (5 pcs)", 2772] ] },
  { n: "Salad and Raita", items: [
   ["Cucumber Raita", 1104], ["Mixed Raita", 1164], ["Pineapple Raita", 1104], ["Onion Raita", 1032], ["Vegetable Salad", 1260],
   ["Cucumber Salad", 1104], ["Kachumber Salad", 1260], ["Tomato Onion Salad", 1104], ["Chicken Tikka Salad", 2772] ] },
  { n: "Biriyani", img: "biriyani", items: [
   ["Chicken Biriyani", 1956, "pop", "biriyani"], ["Mutton Biriyani", 2604], ["Vegetable Biriyani", 1464], ["Fish Biriyani", 2436], ["Prawns Biriyani", 2436] ] },
  { n: "Basmati Rice", items: [
   ["Kashmiri Chicken Pulao", 2004], ["Mutton Hyderabadi Pulao", 3096], ["Paneer Pulao", 1740], ["Vegetable Pulao", 1332], ["Jeera Pulao", 1296] ] },
  { n: "Vegetable Curry", items: [
   ["Paneer Butter Masala", 2520, "2"], ["Dhal Butter Fry", 1788], ["Channa Masala", 1788], ["Palak Paneer", 2496],
   ["Lemongrass Special Vegetable Curry", 1788], ["Potato Mushroom Masala", 2112], ["Mushroom Butter Masala", 2280], ["Mushroom Pepper Fry", 2280],
   ["Vegetable Navratan Korma", 1956], ["Kadhai Vegetable", 1788], ["Aloo Chana Masala", 1884], ["Tawa Paneer Masala", 2496],
   ["Vegetable Jalfrezi", 1656], ["Aloo Gobi", 2004], ["Kadhai Paneer", 2496], ["Aloo Palak", 1584], ["Mushroom Dopiaza", 2280],
   ["Aloo Paneer Kofta", 2196], ["Palak Mushroom with Baby Corn", 2280], ["Palak Dhal", 1788], ["Dum Mughlai Gobi", 2004], ["Aloo Jeera", 1260] ] },
  { n: "Chicken Curry", img: "chicken-tikka-masala", items: [
   ["Butter Chicken Masala", 2688, "1"], ["Chicken Tikka Masala", 2856, 0, "chicken-tikka-masala"], ["Chicken Kurma", 2688], ["Chicken and Potatoes Curry", 2604],
   ["Kadhai Chicken", 2688], ["Chicken Varuval", 2856], ["Chicken Vindaloo", 2688], ["Chicken Chettinadu", 2856], ["Chicken Masala", 2688],
   ["Chicken Palak", 2688], ["Chicken Tikka Jalfrezi", 2988] ] },
  { n: "Mutton Curry", img: "mutton-kuruma", items: [
   ["Mutton Kurma", 3420, 0, "mutton-kuruma"], ["Mutton Rogan Josh", 3420], ["Kadhai Mutton", 3420, "pop"], ["Mutton Masala", 3420], ["Mutton Bhuna", 3420], ["Mutton Chettinadu", 3420] ] },
  { n: "Seafood Curry", items: [
   ["Prawns Chettinadu", 3420], ["Kadhai Prawns", 3216], ["Prawns Malai Curry", 3420], ["Seafood Medley Curry", 3420], ["Prawns Mushroom Curry", 3420] ] },
  { n: "Egg Curry", items: [ ["Egg Masala", 1548], ["Egg Chettinadu", 1584], ["Egg Bhurji", 1584] ] },
  { n: "Indian Breads", img: "cheese-naan", items: [
   ["Garlic Naan", 540], ["Butter Naan", 516], ["Plain Naan", 432], ["Aloo Paratha", 648], ["Paneer Kulcha", 936], ["Plain Kulcha", 600], ["Plain Roti", 564], ["Butter Roti", 648] ] },
  { n: "Lemongrass Special", img: "chilli-paratha", items: [
   ["Chicken Paratha Kottu", 1788], ["Egg Paratha Kottu", 1428], ["Vegetable Paratha Kottu", 1260], ["Malaysian Paratha Kottu", 1428],
   ["Channa Bhature", 1164], ["Poori (2 pcs)", 1164], ["Chapati (2 pcs)", 1164], ["Paratha (Single)", 684] ] }
 ]},
 { id: "thai", label: "Thai", cats: [
  { n: "Thai Appetizers", items: [
   ["Fried Fish Cake (5 pcs)", 3960], ["French Fries", 1680, "pop"], ["Vegetable Tempura", 2304], ["Fish Tempura", 3264], ["Prawn Tempura (Batter Prawns)", 3900], ["Cuttlefish Tempura (Batter)", 3900] ] },
  { n: "Thai Soup", items: [
   ["Tom Yum Prawn Soup", 1584], ["Tom Yum Seafood Soup", 1584], ["Tom Yum Chicken Soup", 1656], ["Tom Yum Vegetable Soup", 1440],
   ["Thai Coconut Chicken Soup (Tom Kha Kai)", 1656], ["Thai Coconut Prawns Soup", 1584], ["Sweet Corn Soup with Chicken", 1656], ["Sweet Corn Soup with Vegetable", 1428],
   ["Seafood Glass Noodles Soup", 1680], ["Vegetable Glass Noodles Soup", 1440] ] },
  { n: "Thai Salad", items: [
   ["Papaya Salad", 1956], ["Mango Salad", 1956], ["Spicy Seafood Salad", 3420], ["Spicy Glass Noodles Seafood Salad", 3660], ["Spicy Glass Noodles Chicken Salad", 3144],
   ["Chicken Salad", 3276], ["Fresh Vegetable Salad", 2232], ["Fruit and Vegetable Salad with Mayonnaise", 2496] ] },
  { n: "Thai Vegetable Dishes", items: [
   ["Fried Mixed Vegetable", 2628], ["Deep Fried Mushroom with Hot Butter", 3216], ["Fried Morning Glory (Kan Kun with Garlic)", 2304], ["Deviled Mushrooms", 2304],
   ["Fried Bean Curd with Mushroom and Oyster Sauce", 2652], ["Fried Bean Curd with Basil Leaves", 2652], ["Deep Fried Bean Curd with Hot Garlic Sauce", 2724] ] },
  { n: "Thai Chicken Dishes", items: [
   ["Green Curry Chicken", 3672], ["Red Curry Chicken", 3672], ["Chicken Panang", 3672], ["Chicken Garlic and Pepper", 3672], ["Fried Chicken with Cashew Nuts and Fry Chilli", 3672],
   ["Deviled Chicken", 3672], ["Chicken with Mixed Vegetable", 3672], ["Fried Chicken with Black Pepper", 3672], ["Chicken with Basil Leaves", 3672],
   ["Sweet and Sour Chicken", 3672], ["Kankung with Chicken", 3672], ["Fried Chicken with Hot Garlic Sauce", 3672] ] },
  { n: "Thai Beef Dishes", items: [ ["Green Curry Beef", 3828] ] },
  { n: "Thai Fish Dishes", items: [
   ["Green Curry Fish", 3960], ["Red Curry Fish with Bamboo Shoots", 3960], ["Fish Fillet with Sweet and Sour Sauce", 3960], ["Deviled Fish", 3960], ["Garlic and Pepper Fish", 3960],
   ["Steam Fish Fillet with Lime and Chilli Sauce", 3960], ["Fried Fish with Hot Garlic Sauce", 3960], ["Fish with Saldari", 3960], ["Fish Fillet with Panang", 3960],
   ["Fried Fish Fillet with Black Pepper", 3960], ["Fish with Ginger", 3960] ] },
  { n: "Thai Prawn Dishes", items: [
   ["Green Curry Prawn", 4152, "pop"], ["Red Curry Prawn with Bamboo Shoots", 4152, "pop"], ["Sweet and Sour Prawns", 4152], ["Steam Prawns with Lime and Chilli Sauce", 4152],
   ["Deviled Prawns", 4152], ["Prawn with Basil Leaves", 4152], ["Steam Prawns with Lemon Sauce", 4152], ["Panang Prawns", 4152], ["Fried Prawns with Black Pepper", 4152],
   ["Deep Fried Prawns with Garlic and Pepper", 4152], ["Fried Prawns with Hot Garlic Sauce", 4152], ["Hot Butter Prawns", 4152] ] },
  { n: "Thai Cuttlefish Dishes", items: [
   ["Hot Butter Cuttlefish", 4152], ["Deep Fried Cuttlefish with Black Pepper", 4152], ["Steamed Cuttlefish with Lime and Chilli Sauce", 4152], ["Green Curry Cuttlefish", 4152],
   ["Deviled Cuttlefish", 4152], ["Cuttlefish Panang", 4152], ["Cuttlefish with Basil Leaves", 4152], ["Red Curry Cuttlefish with Bamboo Shoots", 4152] ] },
  { n: "Thai Egg", items: [ ["Prawns Omelette", 2772], ["Chicken Omelette", 2604], ["Vegetable Omelette", 2280] ] },
  { n: "Thai Fried Rice", img: "fried-rice", items: [
   ["Chicken Fried Rice", [3276, 4284], 0, "fried-rice"], ["Egg Fried Rice", [2436, 3096]], ["Vegetable Fried Rice", [2568, 3192]], ["Seafood Fried Rice", [3636, 4680]],
   ["Prawn Fried Rice", [3636, 4584]], ["Fish Fried Rice", [3276, 4308]], ["Spicy Fried Rice", [3504, 4416]], ["Spicy Seafood Fried Rice", [3840, 4860]],
   ["Pineapple Fried Rice", [3216, 3960]], ["Chop Suey Rice Chicken", 4164, 0, "chop-suey"], ["Chop Suey Rice Seafood", 4812], ["Steamed Rice (Per Bowl)", 900] ] },
  { n: "Thai Noodles", items: [
   ["Pad Thai Noodles", [3216, 4164]], ["Pad Thai Noodles with Seafood", [3276, 4284]], ["Pad Thai Vegetable Noodles", [2772, 3792]], ["Fried Noodles", [3276, 4284]],
   ["Fried Noodles with Seafood", [3636, 4284]], ["Fried Vegetable Noodles", [2772, 3792], "pop"], ["Fried Egg Noodles", [3144, 3792]], ["Egg Noodles", [3504, 4068]],
   ["Spicy Fried Noodles", [3504, 4044]], ["Spicy Fried Noodles with Seafood", [3756, 4284]], ["Glass Noodles", [3636, 4512]], ["Glass Noodles with Seafood", [3828, 4860]] ] }
 ]},
 { id: "sets", label: "Sets & Sawan", cats: [
  { n: "Special Thai Set Menu", note: "Fried rice, vegetable chop suey, omelette and chilli paste", items: [
   ["Chicken Special", 1788, "3"], ["Fish Special", 1872], ["Vegetable Special", 1548], ["Egg Thai Set Menu", 1584], ["Cuttlefish Special", 2148], ["Prawns Special", 2148] ] },
  { n: "Sawan", note: "Big sharing platters for the family", items: [
   ["Chicken Sawan", 13800, 0, 0, "Chicken biriyani, tandoori chicken (full) and more"],
   ["Vegetable Sawan", 11710, 0, 0, "Vegetable biriyani, channa masala, aloo jeera, raitha and more"],
   ["Fish Sawan", 16080, 0, 0, "Fish biriyani, boiled egg, channa masala, raitha and more"] ] },
  { n: "Drinks", items: [ ["Soft Drink", 400, "pop"], ["Mineral Water", 250] ] }
 ]}
];
