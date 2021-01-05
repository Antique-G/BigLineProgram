import wangEditor from 'wangeditor';
const E = wangEditor
const { BtnMenu } = E

export class InsertABCMenu extends BtnMenu   {
    constructor(public editor:wangEditor) {
        super(E.$(
            `<div class="w-e-menu">
                <button (click)='test.showConfirm()'>ABC</button>
            </div>`),editor)
    }

    // modal:any = this.cc
    // 菜单点击事件
    clickHandler() {
        let config = this.editor.config
        let collback = config.customFunction
        if (collback && typeof collback === 'function') {
            collback();
        }
   
         
    }
    // 菜单激活状态
    tryChangeActive() {
        this.active() // 菜单激活
        // this.unActive() // 菜单不激活
    }

   
}

