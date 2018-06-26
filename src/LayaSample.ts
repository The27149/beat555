// 程序入口
class GameMain{
    constructor(){
        Laya.init(800,600);
        Laya.stage.bgColor = 'gray';
        Laya.Stat.show(800,0);

        var res: Array<any> = [
            {url: 'res/atlas/ui.json',type: Laya.Loader.ATLAS},
            {url: 'ui/back.png',type:Laya.Loader.IMAGE}
        ];

        Laya.loader.load(res,Laya.Handler.create(this,this.onloaded));
    }

    onloaded():void{
        var v:view.mainView = new view.mainView();
        Laya.stage.addChild(v); 
    }
}
new GameMain();