import '../style/visual.less';
import Tree from './tree';

export default class Visual extends WynVisual {

  private navInfo : any;
  private dom : HTMLElement;
  private tree : Tree;
  private commandService : VisualNS.CommandService;

  constructor(dom: HTMLDivElement, host: VisualNS.VisualHost, options: VisualNS.IVisualUpdateOptions) {
    super(dom, host, options);
    const div = document.createElement("div");
    div.style.width = "100%";
    div.style.height = "100%";
    div.style.color = "#ffffff";
    dom.appendChild(div);
    this.dom = div;
    this.commandService = host.commandService;

  }

  public update(options: VisualNS.IVisualUpdateOptions) {
    this.navInfo = options.properties["navInfo"];
    this.tree = new Tree(this.dom,this.commandService);
    
    try{
      let data = JSON.parse(this.navInfo);      
      this.tree.buildTree(data);
    }catch(e){
      console.error(`转换JSON错误: ${this.navInfo}`);
    }
    console.log(options);
  }

  public onDestroy(): void {

  }

  public getInspectorHiddenState(options: VisualNS.IVisualUpdateOptions): string[] {
    return null;
  }

  public getActionBarHiddenState(options: VisualNS.IVisualUpdateOptions): string[] {
    return null;
  }

  public getColorAssignmentConfigMapping(dataViews: VisualNS.IDataView[]): VisualNS.IColorAssignmentConfigMapping {
    return null;
  }
}