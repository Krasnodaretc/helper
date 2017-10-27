'use strict';
/**
 * Created by Krasnodaretc on 27.10.17.
 */
module.exports = async function helpItems (db) {

  let result = [];


  let items = await db.collection("items").find(
    {
      $or: [
        {
          'kitItem.reqItems': {
            $exists: 1
          }
        },
        {
          'kitItems.freeItems': {
            $exists: 1
          }
        }
      ]
    }, ['reqItems', 'freeItems', 'axaptaItemId', 'kitItem']
  ).toArray();

  items.forEach(item => {

    Object.keys(item.kitItem).forEach(typeKit => {
      let middle = [];
      if (item[typeKit].length >= 2) {
        item[typeKit].forEach(itemKit => {

          ~middle.indexOf(itemKit.itemId) ? result.push(item.axaptaItemId) : middle.push(itemKit.itemId);

        })
      }
    })
  });

  return result;
};