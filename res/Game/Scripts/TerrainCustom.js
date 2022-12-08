TerrainCustom = cc.ComponentJS.extend({
    ctor: function () {
        this._super();
    },
    onEnter: function () {
        var terrain = this.getOwner();
        var rootChild = terrain.getChildren()[0];
        //rootChild.getChildByName("background").setVisible(false);
        rootChild.getChildByName("river_ocean").setVisible(false);
        //rootChild.getChildByName("shadow_fake").setVisible(false);
        rootChild.getChildByName("grass").setVisible(false);
        //rootChild.getChildByName("tree").setVisible(false);
        rootChild.getChildByName("fishes_place").setVisible(false);
        rootChild.getChildByName("wave2").setVisible(false);
        rootChild.getChildByName("ven_bien").setVisible(false);
        rootChild.getChildByName("vung_nuoi_ca").setVisible(false);
    }
})
