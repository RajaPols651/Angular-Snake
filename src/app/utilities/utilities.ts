export class Helper{
    public static getRandomInt(max: number) : number {
        return Math.floor(Math.random() * Math.floor(max));
      }

      public static getClientWidth() : number{
        var myWidth = 0;
        if( typeof window.innerWidth === "number" ) {
            myWidth = window.innerWidth;//Non-IE
        } else if( document.documentElement && ( document.documentElement.clientWidth || document.documentElement.clientHeight ) ) {
            myWidth = document.documentElement.clientWidth;//IE 6+ in 'standards compliant mode'
        } else if( document.body && ( document.body.clientWidth || document.body.clientHeight ) ) {
            myWidth = document.body.clientWidth;//IE 4 compatible
        }
        return myWidth;
       }
    
       public static getClientHeight(): number{
        var myHeight = 0;
        if( typeof window.innerHeight === "number" ) {
            myHeight = window.innerHeight;//Non-IE
        } else if( document.documentElement && ( document.documentElement.clientWidth || document.documentElement.clientHeight ) ) {
            myHeight = document.documentElement.clientHeight;//IE 6+ in 'standards compliant mode'
        } else if( document.body && ( document.body.clientWidth || document.body.clientHeight ) ) {
            myHeight = document.body.clientHeight;//IE 4 compatible
        }
        return myHeight;
      }

      public static getActualLeft(left: number){
        return Math.floor(left / 20) * 20;
      }

      public static getActualTop(top: number){
        return Math.floor(top / 20) * 20;
      }
}

export class KeyBoardKeys{
  static readonly ESC_KEY = 27;
  static readonly LEFT_ARROW_KEY = 37;
  static readonly RIGHT_ARROW_KEY = 39;
  static readonly DOWN_ARROW_KEY = 40;
  static readonly UP_ARROW_KEY = 38;
  static readonly SPACEBAR_KEY = 32;
  static readonly A_KEY = 65;
}

