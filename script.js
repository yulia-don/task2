let arrStock=[
    {
      id: 0,
      name: "product1",
      count: 7,
      price: 200,
    },
    {
      id: 1,
      name: "product2",
      count: 2,
      price: 150,
    },
    {
      id: 2,
      name: "product3",
      count: 5,
      price: 250,
    },
    {
      id: 3,
      name: "product4",
      count: 6,
      price: 100,
    }
  ];
  let arrBask=[
    {
      id: 0,
      name: "product1",
      count: 0,
      price: 200,
    },
    {
      id: 1,
      name: "product2",
      count: 0,
      price: 150,
    },
    {
      id: 2,
      name: "product3",
      count: 0,
      price: 250,
    },
    {
      id: 3,
      name: "product4",
      count: 0,
      price: 100,
    }
  ];
  let sum=0;
  
  webix.ui({
    cols:[
        {rows:[
            {template:"Stock", height:20},
            {id:"tableStock", view:"datatable", autoConfig:true, data:arrS(), scroll:"y"},
            {id:"addBtn", view:"button", value:"add", inputWidth:50, click:addProd, height:40}
        ]},
        {rows:[
            {template:"Basket", height:20},
            {id:"tableBasket", view:"datatable", autoConfig:true, data:arrB(), scroll:"y",},
            {cols:[
              {id:"labelSum", view:"label", label:"sum=",readonly:true, height:40},
              {id:"delBtn", view:"button", value:"del", inputWidth:50, click:delProd, height:40}
          ]}
        ]}
    ],
   
    
});

function arrS()
{
  let arr=[];
  for (i=0;i<arrStock.length;i++)
  {
    if(arrStock[i].count!=0)
    {
      arr.push(arrStock[i]);
    }
  }
  return arr;
}
function arrB()
{
  let arr=[];
  for (i=0;i<arrBask.length;i++)
  {
    if(arrBask[i].count!=0)
    {
      arr.push(arrBask[i]);
    }
  }
  return arr;
}
function addProd()
{
  let obj=$$('tableStock').getSelectedItem();
  if (obj.count>0)
  {
    for (i=0; i<arrStock.length; i++)
   {
      if (obj.name==arrStock[i].name && obj.price==arrStock[i].price)
      {
        arrStock[i].count=arrStock[i].count-1;
        arrBask[i].count=arrBask[i].count+1;
       
        addSum(obj.price);
      }
    }
  }
  else
  {
    let btn=$$('addBtn').disable();
  }
  let btn=$$('addBtn').enable();
  $$('tableStock').clearAll();
  $$('tableStock').define("data",arrS());
  $$('tableStock').refresh();
  $$('tableBasket').clearAll();
  $$('tableBasket').define("data",arrB());
  $$('tableBasket').refresh();
}

function delProd()
{
  let obj=$$('tableBasket').getSelectedItem();
  if (obj.count>0)
  {
    for (i=0; i<arrBask.length; i++)
   {
      if (obj.name==arrBask[i].name && obj.price==arrBask[i].price)
      {
        arrStock[i].count=arrStock[i].count+1;
        arrBask[i].count=arrBask[i].count-1;
        
        addSum(-obj.price);
      }
    }
  }
  else
  {
    let btn=$$('delBtn').disable();
  }
  let btn=$$('delBtn').enable();
  $$('tableStock').clearAll();
  $$('tableStock').define("data",arrS());
  $$('tableStock').refresh();
  $$('tableBasket').clearAll();
  $$('tableBasket').define("data",arrB());
  $$('tableBasket').refresh();
}

function addSum(prce)
{
  sum=sum+prce;
  $$('labelSum').define("label","sum="+sum+"");
  $$('labelSum').refresh();
}