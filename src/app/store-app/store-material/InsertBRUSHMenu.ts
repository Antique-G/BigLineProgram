import wangEditor from 'wangeditor';
const E = wangEditor
const { BtnMenu } = E

export class InsertBRUSHMenu extends BtnMenu {
    
    constructor(editor:any) {
      
            const $elem = E.$(
                `<div class="w-e-menu" data-title="Alert">
                <i class="iconfont icon-geshishua"></i>
                </div>`
            )
            super($elem, editor)
            this.unActive()
    }

    // modal:any = this.cc
    // 菜单点击事件
    clickHandler(e:any) {
        // editor是全局的编辑器对象（详情去看wangEditor的源码）
        const editor = this.editor

        const isSeleEmpty = editor.selection.isSelectionEmpty()
       
        if (isSeleEmpty) {
            return
        }
        console.log(1);
        
        if (this._active) {
            this._active = false
            editor._brush=false
            editor._dblBrush=false
            this.$elem.removeClass('w-e-active')
            editor.$textContainerElem.removeClass('brush')
            return
        }

        console.log(2);


        this._active = true
        editor._brush=true

        // editor._clickBrush = e.type ==='click'?true:false

        editor._dblBrush= e.type ==='click'?true:false
        this.$elem.addClass('w-e-active')
        editor.$textContainerElem.addClass('brush')

        console.log(3);


        let containerEle = editor.selection.getSelectionContainerElem()
        let style = containerEle.css()

        console.log(editor.$textElem);

        while (!containerEle.equal(editor.selection.getSelectionContainerElem().elems[0])) {
            containerEle=containerEle.parent()
            if (containerEle.parent().equal(editor.selection.getSelectionContainerElem().elems[0])&&!containerEle.equal(editor.selection.getSelectionContainerElem().elems[0])) {
                style=Object.assign({},style,{wrap:containerEle.css()})
            }
            if(!containerEle.parent().equal(editor.selection.getSelectionContainerElem().elems[0])&&!containerEle.equal(editor.selection.getSelectionContainerElem().elems[0])){
                style=Object.assign({},style,containerEle.css())
            }
        }
        console.log(style);
//保存style
        editor._style=style



    }
    
    // 菜单激活状态
    tryChangeActive() {
        // this.active() // 菜单激活
        // this.unActive() // 菜单不激活
        
        if (this.editor.cmd.queryCommandState('insertBRUSH')) {
            this.active();
        } else {
            this.unActive();
        }
    }







}

