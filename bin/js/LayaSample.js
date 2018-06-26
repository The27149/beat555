// 程序入口
var GameMain = (function () {
    function GameMain() {
        Laya.init(800, 600);
        Laya.stage.bgColor = 'gray';
        Laya.Stat.show(800, 0);
        var res = [
            { url: 'res/atlas/ui.json', type: Laya.Loader.ATLAS },
            { url: 'ui/back.png', type: Laya.Loader.IMAGE }
        ];
        Laya.loader.load(res, Laya.Handler.create(this, this.onloaded));
    }
    GameMain.prototype.onloaded = function () {
        var v = new view.mainView();
        Laya.stage.addChild(v);
    };
    return GameMain;
}());
new GameMain();
//# sourceMappingURL=LayaSample.js.map