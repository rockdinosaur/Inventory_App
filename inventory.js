var inventory;
var id = 1;

(function() {
  inventory = {
    collection: [],

    setDate: function() {
      var date = new Date();
      $("#order_date").text(date.toUTCString());
    },

    cacheTemplate: function() {
      var $i_tmpl = $("#inventory_item").remove();
      this.template = $i_tmpl.html();
    },

    init: function() {
      this.setDate();
      this.cacheTemplate()
    },
  };
}());

$(inventory.init.bind(inventory));

$(function() {
  $("#add_item").click(function(e) {
    e.preventDefault();
    var itemHTMLTemplate = inventory.template.replace(/ID/g, String(id));
    var itemObj = {
      id: String(id),
      name: '',
      stockNumber: '',
      quantity: 1,
    }
    $("#inventory").append($.parseHTML($.trim(itemHTMLTemplate)));
    inventory.collection.push(itemObj);
    id += 1;
  })

  $("#inventory").on("blur", "input", (function(e) {
    var $target = $(e.target);
    var itemID = $target.parents("tr").find("input[type='hidden']").attr("value");
    if ($target.attr("name").startsWith("item_name")) {
      var itemName = $target.val();
      inventory.collection.forEach(function(item) {
        if (item.id === itemID) { item.name = itemName }
      })
    } else if ($target.attr("name").startsWith("item_stock_number")) {
      var itemStockNumber = $target.val();
      inventory.collection.forEach(function(item, idx) {
        if (item.id === itemID) { item.stockNumber = itemStockNumber }
      })
    } else if ($target.attr("name").startsWith("item_quantity")) {
      var itemQuantity = $target.val();
      inventory.collection.forEach(function(item) {
        if (item.id === itemID) { item.quantity = parseInt(itemQuantity, 10) }
      })
    }
  }));

  $("#inventory").on("click", ".delete", (function(e) {
    e.preventDefault();
    var itemID = $(e.target).parents("tr").find("input[type='hidden']").attr("value");
    var thisRow = $(e.target).parents("tr");
    inventory.collection.forEach(function(item, idx) {
      if (item.id === itemID) { inventory.collection.splice(idx, 1) }
    })
    thisRow.remove();
  }))
})
