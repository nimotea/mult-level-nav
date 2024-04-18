interface TreeNode {
    id : number,
    name : string,
    children : TreeNode[]
}

class TreeNode {
    constructor( id : number, name : string){
        this.id = id;
        this.name = name;
        this.children = [];
    }
}

export default class Tree {
    
    private container : HTMLElement | null;
    private commandService :VisualNS.CommandService;
    constructor(container : HTMLElement, commandService:VisualNS.CommandService) {
        this.container = container;
        this.commandService = commandService;
    }
    createChildNode(data:TreeNode):HTMLElement{
        const a = document.createElement("a");
        const root = this;
        a.addEventListener("click",function(event){
            event.stopPropagation();
            root.commandService.execute([
                {
                    name: 'Jump',
                    payload : {
                        jumpToName :a.innerText
                    }
                }
            ])
        })
        const li = document.createElement("li");
        a.innerText = data.name;
        li.appendChild(a);
        if(data.children){
            const ul = document.createElement("ul")
            data.children.forEach(child => {
                ul.appendChild(this.createChildNode(child))
            })
            li.appendChild(ul);
        }
        return li;
    }
    buildTree(data:TreeNode):HTMLElement{
        if(!data){
            return;
        }
        this.container.innerHTML = '';
        const ul = document.createElement("ul");
        this.container.appendChild(ul);
        ul.appendChild(this.createChildNode(data));
        return this.container;
    }

}