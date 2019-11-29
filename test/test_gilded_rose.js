var { expect } = require('chai');
var { Shop, Item } = require('../src/gilded_rose.js');
describe("Gilded Rose", function () {

  const itemList = {
    backstage: 'Backstage passes to a TAFKAL80ETC concert',
    agedBrie: 'Aged Brie',
    sulfuras: 'Sulfuras, Hand of Ragnaros',
    foo: 'bar',
    conjured: 'Conjured',
  };

  describe('Regular items', () => {
    it("should degrade one by day", () => {
      const gildedRose = new Shop([new Item(itemList.foo, 14, 10)]);
      let items;
      items = gildedRose.updateQuality();
      expect(items[0].name).to.equal('bar');
      expect(items[0].sellIn).to.equal(13);
      expect(items[0].quality).to.equal(9);

      items = gildedRose.updateQuality();
      expect(items[0].name).to.equal('bar');
      expect(items[0].sellIn).to.equal(12);
      expect(items[0].quality).to.equal(8);
    });

    it("should degrade twice faster if the sellin date has passed", function () {
      const gildedRose = new Shop([new Item(itemList.foo, 1, 10)]);
      let items;
      items = gildedRose.updateQuality();
      expect(items[0].name).to.equal('bar');
      expect(items[0].sellIn).to.equal(0);
      expect(items[0].quality).to.equal(9);

      items = gildedRose.updateQuality();
      expect(items[0].name).to.equal('bar');
      expect(items[0].sellIn).to.equal(-1);
      expect(items[0].quality).to.equal(7);

      items = gildedRose.updateQuality();
      expect(items[0].name).to.equal('bar');
      expect(items[0].sellIn).to.equal(-2);
      expect(items[0].quality).to.equal(5);
    });

    it("should keep the quality positive", function () {
      const gildedRose = new Shop([new Item(itemList.foo, 1, 1)]);
      let items;
      items = gildedRose.updateQuality();
      expect(items[0].name).to.equal('bar');
      expect(items[0].sellIn).to.equal(0);
      expect(items[0].quality).to.equal(0);

      items = gildedRose.updateQuality();
      expect(items[0].name).to.equal('bar');
      expect(items[0].sellIn).to.equal(-1);
      expect(items[0].quality).to.equal(0);

      items = gildedRose.updateQuality();
      expect(items[0].name).to.equal('bar');
      expect(items[0].sellIn).to.equal(-2);
      expect(items[0].quality).to.equal(0);
    });
  });

  describe('Aged brie items exceptions', () => {
    it("should increase quality the older it gets", function () {
      const gildedRose = new Shop([new Item(itemList.agedBrie, 3, 1)]);
      let items;
      items = gildedRose.updateQuality();
      expect(items[0].name).to.equal(itemList.agedBrie);
      expect(items[0].sellIn).to.equal(2);
      expect(items[0].quality).to.equal(2);

      items = gildedRose.updateQuality();
      expect(items[0].name).to.equal(itemList.agedBrie);
      expect(items[0].sellIn).to.equal(1);
      expect(items[0].quality).to.equal(3);

      items = gildedRose.updateQuality();
      expect(items[0].name).to.equal(itemList.agedBrie);
      expect(items[0].sellIn).to.equal(0);
      expect(items[0].quality).to.equal(4);
    });

    it("should increase twice faster when the sell date has passed", function () {
      const gildedRose = new Shop([new Item(itemList.agedBrie, 1, 1)]);
      let items;
      items = gildedRose.updateQuality();
      expect(items[0].name).to.equal(itemList.agedBrie);
      expect(items[0].sellIn).to.equal(0);
      expect(items[0].quality).to.equal(2);

      items = gildedRose.updateQuality();
      expect(items[0].name).to.equal(itemList.agedBrie);
      expect(items[0].sellIn).to.equal(-1);
      expect(items[0].quality).to.equal(4);

      items = gildedRose.updateQuality();
      expect(items[0].name).to.equal(itemList.agedBrie);
      expect(items[0].sellIn).to.equal(-2);
      expect(items[0].quality).to.equal(6);
    });

    it("should keep the quality below 51", function () {
      const gildedRose = new Shop([new Item(itemList.agedBrie, 1, 46)]);
      let items;
      items = gildedRose.updateQuality();
      expect(items[0].name).to.equal(itemList.agedBrie);
      expect(items[0].sellIn).to.equal(0);
      expect(items[0].quality).to.equal(47);

      items = gildedRose.updateQuality();
      expect(items[0].name).to.equal(itemList.agedBrie);
      expect(items[0].sellIn).to.equal(-1);
      expect(items[0].quality).to.equal(49);

      items = gildedRose.updateQuality();
      expect(items[0].name).to.equal(itemList.agedBrie);
      expect(items[0].sellIn).to.equal(-2);
      expect(items[0].quality).to.equal(50);
    });
  });

  describe('Sulfuras items exceptions', () => {
    it("should not change properties over time", function () {
      const gildedRose = new Shop([new Item(itemList.sulfuras, 3, 80)]);
      let items;
      items = gildedRose.updateQuality();
      expect(items[0].name).to.equal(itemList.sulfuras);
      expect(items[0].sellIn).to.equal(3);
      expect(items[0].quality).to.equal(80);

      items = gildedRose.updateQuality();
      expect(items[0].name).to.equal(itemList.sulfuras);
      expect(items[0].sellIn).to.equal(3);
      expect(items[0].quality).to.equal(80);

      items = gildedRose.updateQuality();
      expect(items[0].name).to.equal(itemList.sulfuras);
      expect(items[0].sellIn).to.equal(3);
      expect(items[0].quality).to.equal(80);
    });

    it.skip("should keep quality as 80", function () {
      const gildedRose = new Shop([new Item(itemList.sulfuras, 3, 10)]);
      let items;
      items = gildedRose.updateQuality();
      expect(items[0].name).to.equal(itemList.sulfuras);
      expect(items[0].sellIn).to.equal(3);
      expect(items[0].quality).to.equal(80);

      items = gildedRose.updateQuality();
      expect(items[0].name).to.equal(itemList.sulfuras);
      expect(items[0].sellIn).to.equal(3);
      expect(items[0].quality).to.equal(80);

      items = gildedRose.updateQuality();
      expect(items[0].name).to.equal(itemList.sulfuras);
      expect(items[0].sellIn).to.equal(3);
      expect(items[0].quality).to.equal(80);
    });
  });

  describe('Backstage passes items exceptions', () => {
    it("should increase quality the older it gets", function () {
      const gildedRose = new Shop([new Item(itemList.backstage, 15, 1)]);
      let items;
      items = gildedRose.updateQuality();
      expect(items[0].name).to.equal(itemList.backstage);
      expect(items[0].sellIn).to.equal(14);
      expect(items[0].quality).to.equal(2);

      items = gildedRose.updateQuality();
      expect(items[0].name).to.equal(itemList.backstage);
      expect(items[0].sellIn).to.equal(13);
      expect(items[0].quality).to.equal(3);

      items = gildedRose.updateQuality();
      expect(items[0].name).to.equal(itemList.backstage);
      expect(items[0].sellIn).to.equal(12);
      expect(items[0].quality).to.equal(4);
    });

    it("should increase quality by 2 when sellIn is below 10", function () {
      const gildedRose = new Shop([new Item(itemList.backstage, 11, 1)]);
      let items;
      items = gildedRose.updateQuality();
      expect(items[0].name).to.equal(itemList.backstage);
      expect(items[0].sellIn).to.equal(10);
      expect(items[0].quality).to.equal(2);

      items = gildedRose.updateQuality();
      expect(items[0].name).to.equal(itemList.backstage);
      expect(items[0].sellIn).to.equal(9);
      expect(items[0].quality).to.equal(4);

      items = gildedRose.updateQuality();
      expect(items[0].name).to.equal(itemList.backstage);
      expect(items[0].sellIn).to.equal(8);
      expect(items[0].quality).to.equal(6);
    });

    it("should increase quality by 3 when sellIn is below 5", function () {
      const gildedRose = new Shop([new Item(itemList.backstage, 6, 1)]);
      let items;
      items = gildedRose.updateQuality();
      expect(items[0].name).to.equal(itemList.backstage);
      expect(items[0].sellIn).to.equal(5);
      expect(items[0].quality).to.equal(3);

      items = gildedRose.updateQuality();
      expect(items[0].name).to.equal(itemList.backstage);
      expect(items[0].sellIn).to.equal(4);
      expect(items[0].quality).to.equal(6);

      items = gildedRose.updateQuality();
      expect(items[0].name).to.equal(itemList.backstage);
      expect(items[0].sellIn).to.equal(3);
      expect(items[0].quality).to.equal(9);
    });

    it("should drop the quality to 0 after the concert", function () {
      const gildedRose = new Shop([new Item(itemList.backstage, 1, 15)]);
      let items;
      items = gildedRose.updateQuality();
      expect(items[0].name).to.equal(itemList.backstage);
      expect(items[0].sellIn).to.equal(0);
      expect(items[0].quality).to.equal(18);

      items = gildedRose.updateQuality();
      expect(items[0].name).to.equal(itemList.backstage);
      expect(items[0].sellIn).to.equal(-1);
      expect(items[0].quality).to.equal(0);

      items = gildedRose.updateQuality();
      expect(items[0].name).to.equal(itemList.backstage);
      expect(items[0].sellIn).to.equal(-2);
      expect(items[0].quality).to.equal(0);
    });

    it("should keep the quality below 51", function () {
      const gildedRose = new Shop([new Item(itemList.backstage, 4, 45)]);
      let items;
      items = gildedRose.updateQuality();
      expect(items[0].name).to.equal(itemList.backstage);
      expect(items[0].sellIn).to.equal(3);
      expect(items[0].quality).to.equal(48);

      items = gildedRose.updateQuality();
      expect(items[0].name).to.equal(itemList.backstage);
      expect(items[0].sellIn).to.equal(2);
      expect(items[0].quality).to.equal(50);

      items = gildedRose.updateQuality();
      expect(items[0].name).to.equal(itemList.backstage);
      expect(items[0].sellIn).to.equal(1);
      expect(items[0].quality).to.equal(50);
    });
  });

  describe('Conjured items exceptions', () => {
    it("should degrade quality by 2 per day", function () {
      const gildedRose = new Shop([new Item(itemList.conjured, 10, 8)]);
      let items;
      items = gildedRose.updateQuality();
      expect(items[0].name).to.equal(itemList.conjured);
      expect(items[0].sellIn).to.equal(9);
      expect(items[0].quality).to.equal(6);

      items = gildedRose.updateQuality();
      expect(items[0].name).to.equal(itemList.conjured);
      expect(items[0].sellIn).to.equal(8);
      expect(items[0].quality).to.equal(4);

      items = gildedRose.updateQuality();
      expect(items[0].name).to.equal(itemList.conjured);
      expect(items[0].sellIn).to.equal(7);
      expect(items[0].quality).to.equal(2);
    });
  });
});