/**
    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
**/
 
const St = imports.gi.St;
const Mainloop = imports.mainloop;
const Main = imports.ui.main;




const Clutter = imports.gi.Clutter;
const Lang = imports.lang;



const Search = imports.ui.search;

const searchProviders = Main.overview._viewSelector._searchTab._searchSystem._providers;


const searchProviderscount= searchProviders.length




const langSearchProvider = new Lang.Class({
    Name: 'langSearchProvider',
    Extends: Search.SearchProvider,

  

    _init: function(title, interpretations) {
        this.ssystem_id=interpretations[1];
        Search.SearchProvider.prototype._init.call(this, searchProviders[this.ssystem_id].title+' ('+title+')');
        this._buildTemplates(interpretations);
        this.lang=interpretations[0];
	
	this.addon='ruenswich';
    },

   _buildTemplates: function(interpretations) {
        this.templates = [];
    },


    
    _swichlayout: function(terms){
        //global.log('lang'+this.lang);
        var replaceArr=Array();
        if (this.lang=='ru'){
            replaceArr={'q':'\u0439',
                        'w':'\u0446',
                        'e':'\u0443',
                        'r':'\u043a',
                        't':'\u0435',
                        'y':'\u043d',
                        'u':'\u0433',
                        'i':'\u0448',
                        'o':'\u0449',
                        'p':'\u0437',
                        '[':'\u0445',
                        ']':'\u044a',
                        '`':'\u0451',
                        'a':'\u0444',
                        's':'\u044b',
                        'd':'\u0432',
                        'f':'\u0430',
                        'g':'\u043f',
                        'h':'\u0440',
                        'j':'\u043e',
                        'k':'\u043b',
                        'l':'\u0434',
                        ';':'\u0436',
                        "'":'\u044d',
                        'z':'\u044f',
                        'x':'\u0447',
                        'c':'\u0441',
                        'v':'\u043c',
                        'b':'\u0438',
                        'n':'\u0442',
                        'm':'\u044c',
                        ',':'\u0431',
                        '.':'\u044e'

                       };
        }else{
            replaceArr={'\u0439':'q',
                        '\u0446':'w',
                        '\u0443':'e',
                        '\u043a':'r',
                        '\u0435':'t',
                        '\u043d':'y',
                        '\u0433':'u',
                        '\u0448':'i',
                        '\u0449':'o',
                        '\u0437':'p',
                        '\u0445':'[',
                        '\u044a':']',
                        '\u0451':'`',
                        '\u0444':'a',
                        '\u044b':'s',
                        '\u0432':'d',
                        '\u0430':'f',
                        '\u043f':'g',
                        '\u0440':'h',
                        '\u043e':'j',
                        '\u043b':'k',
                        '\u0434':'l',
                        '\u0436':';',
                        '\u044d':"'",
                        '\u044f':'z',
                        '\u0447':'x',
                        '\u0441':'c',
                        '\u043c':'v',
                        '\u0438':'b',
                        '\u0442':'n',
                        '\u044c':'m',
                        '\u0431':',',
                        '\u044e':'.'

                       };
        }
        var newstring=terms.toLowerCase()
    	aryText = new Array(newstring.length)
        for (i = 0; i < newstring.length; i++) {
            aryText[i] = newstring.charAt(i)
        }

        output='';
        for (var i in aryText){
            if (replaceArr.hasOwnProperty(aryText[i])){
                output=output.concat(replaceArr[aryText[i]])
            }else{
                output=output.concat(aryText[i])
            }
        }
        return output;
    },


    getInitialResultSet: function(terms) {
         var newterms=Array();
        tmp=false
        for(i=0;i<terms.length;i++){
            newterms[i]=terms[i]
            newt=this._swichlayout(newterms[i]);
            if (newt!=newterms[i]){
                newterms[i]=newt;
                tmp=true
            }
        }
        if (tmp){
          
            r=searchProviders[this.ssystem_id].getInitialResultSet(newterms)
                   
//            global.log('i '+newterms[0]+' - '+r.length);
            return r;

        }else{
            return [];
        }
	
    },


   

    getSubsearchResultSet: function(previousResults, terms) {
        var newterms=Array();
        tmp=false
        for(i=0;i<terms.length;i++){
            newterms[i]=terms[i]
            newt=this._swichlayout(newterms[i]);
            if (newt!=newterms[i]){
                newterms[i]=newt;
                tmp=true
            }
        }
        if (tmp){
            
           
                
            r=searchProviders[this.ssystem_id].getSubsearchResultSet(previousResults, newterms)
        
                
            
//            global.log('s '+newterms[0]+' - '+r.length);
            return r;
        }else{
            return [];
        }
    },

    getResultMeta: function(resultId) {
//        global.log('t'+resultId);
	return searchProviders[this.ssystem_id].getResultMeta(resultId)
    },
    getResultMetas: function(resultIds) {
//        global.log('t'+resultIds);
	return searchProviders[this.ssystem_id].getResultMetas(resultIds)
    },
    activateResult: function(resultId) {
	
        return searchProviders[this.ssystem_id].activateResult(resultId)
    },
    createResultActor: function(resultMeta, terms) {

        return  searchProviders[this.ssystem_id].createResultActor(resultMeta, terms)
    },

    createResultContainerActor: function() {
       return  searchProviders[this.ssystem_id].createResultContainerActor();
    }
  
});


function ruenSearchProvider(id) {
    this._init(id);
}

ruenSearchProvider.prototype = {
    __proto__: langSearchProvider.prototype,

    _init: function(id) {
        let interpretations = ['ru',id];
        langSearchProvider.prototype._init.call(this, _("EN->RU"), interpretations);
    }
};

function enruSearchProvider(id) {
    this._init(id);
}

enruSearchProvider.prototype = {
    __proto__: langSearchProvider.prototype,

    _init: function(id) {
        let interpretations = ['en',id];
        langSearchProvider.prototype._init.call(this, _("RU->EN"), interpretations);
    }
};


function init() {

}

function enable() {
    for(i=0;i<searchProviderscount;i++){
    	Main.overview.addSearchProvider(new ruenSearchProvider(i));
    	Main.overview.addSearchProvider(new enruSearchProvider(i));
    }
}

function disable(){
    Main.overview.removeSearchProvider(spruen)
    Main.overview.removeSearchProvider(spenru)
}
