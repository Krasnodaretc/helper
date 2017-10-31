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
      ],
      status: 'site'
    }, ['reqItems', 'freeItems', 'axaptaItemId', 'kitItem']
  ).toArray();

  items.forEach(item => {
    let ids = [];

    item.reqItems.forEach(req=>{
      ids.push(req.itemId);
    });

    item.freeItems.forEach(free=>{
      ids.push(free.itemId);
    });

    ids.forEach((id, index) => {
      if (ids.indexOf(id) !== index) result.push(item.axaptaItemId);
    });

  });

  return result;
};