/*
* name;
*/
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var view;
(function (view) {
    var mainView = (function (_super) {
        __extends(mainView, _super);
        function mainView() {
            var _this = _super.call(this) || this;
            _this.mouses = new Array();
            _this.mousesNumb = 9;
            _this.time = 90;
            _this.score = 0;
            _this.init();
            _this.start();
            return _this;
        }
        //初始化
        mainView.prototype.init = function () {
            this.timeBar.value = 1;
            this.score = 0;
            this.createMouse();
        };
        //游戏启动
        mainView.prototype.start = function () {
            Laya.timer.loop(1000, this, this.onLoop);
            Laya.timer.loop(1000, this, this.timeCount);
        };
        //倒计时
        mainView.prototype.timeCount = function () {
            this.timeBar.value -= 1 / this.time;
            if (this.timeBar.value <= 0)
                this.gameOver();
        };
        //游戏结束
        mainView.prototype.gameOver = function () {
            Laya.timer.clear(this, this.timeCount);
            Laya.timer.clear(this, this.onLoop);
            this.hammer.end();
            console.log('游戏结束！');
            console.log(this.timeBar.value);
        };
        //创建地鼠实例和锤子实例
        mainView.prototype.createMouse = function () {
            var box, mouse, hitHander = Laya.Handler.create(this, this.setScore, null, false);
            for (var i = 0; i < this.mousesNumb; i++) {
                box = this.getChildByName('mouseBox').getChildByName('item' + i);
                mouse = new Mouse(box.getChildByName('normal'), box.getChildByName('hit'), box.getChildByName('scoreImg'), 26, hitHander);
                this.mouses.push(mouse);
            }
            this.hammer = new Hammer();
            this.addChild(this.hammer);
        };
        //主循环
        mainView.prototype.onLoop = function () {
            var index = Math.floor(Math.random() * this.mousesNumb);
            this.mouses[index].show();
        };
        //修改分数
        mainView.prototype.setScore = function (type) {
            this.score += (type == 1) ? -100 : 100;
            if (this.score < 0)
                this.score = 0;
            this.updateScore();
        };
        //更新分数显示
        mainView.prototype.updateScore = function () {
            var data = {}, temp = this.score, len = 10 - this.score.toString().length;
            for (var j = 0; j < len; j++) {
                this.scoreBox.getChildByName('item' + j).alpha = 0;
            }
            for (var i = 9; i >= len; i--) {
                data['item' + i] = { index: Math.floor(temp % 10) };
                this.scoreBox.getChildByName('item' + i).alpha = 1;
                temp /= 10;
            }
            this.scoreBox.dataSource = data;
        };
        return mainView;
    }(ui.mainUI));
    view.mainView = mainView;
    //锤子视图类
    var Hammer = (function (_super) {
        __extends(Hammer, _super);
        function Hammer() {
            var _this = _super.call(this) || this;
            _this.start();
            return _this;
        }
        //开始使用
        Hammer.prototype.start = function () {
            Laya.Mouse.hide();
            this.visible = true;
            Laya.stage.on(Laya.Event.MOUSE_DOWN, this, this.onMouseDown);
            Laya.stage.on(Laya.Event.MOUSE_MOVE, this, this.onMouseMove);
        };
        //结束使用
        Hammer.prototype.end = function () {
            Laya.Mouse.show();
            this.visible = false;
            Laya.stage.off(Laya.Event.MOUSE_DOWN, this, this.onMouseDown);
            Laya.stage.off(Laya.Event.MOUSE_MOVE, this, this.onMouseMove);
        };
        Hammer.prototype.onMouseDown = function () {
            this.hit.play(0, false);
        };
        Hammer.prototype.onMouseMove = function () {
            this.pos(Laya.stage.mouseX - 0.4 * this.width, Laya.stage.mouseY - 0.3 * this.height);
        };
        return Hammer;
    }(ui.HammerUI));
    view.Hammer = Hammer;
})(view || (view = {}));
//# sourceMappingURL=viewModule.js.map