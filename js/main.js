// demo data

var datatree = {
  name: 'MyTree',
  children: [
    { name: 'hello2' },
    { name: 'wat2' },
    {
      name: 'child_folderpddre',
      children: [
        {
          name: 'child_folde_hijo',
          children: [
            { name: 'hello23' },
            { name: 'wat23' }
          ]
        },
        { name: 'hello24' },
        { name: 'wat24' },
        {
          name: 'child_folder_hijo_2',
          children: [
            { name: 'hello25' },
            { name: 'wat3' }
          ]
        }
      ]
    }
  ]
}
var data_string = JSON.stringify(datatree);
localStorage.setItem('tree', data_string);
var data = JSON.parse(localStorage.getItem("tree"));
console.log(data);
// define the item component
Vue.component('item', {
  template: '#item-template',
  props: {
    model: Object
  },
  data: function () {
    return {
      open: false
    }
  },
  computed: {
    isFolder: function () {
      return this.model.children &&
        this.model.children.length
    }
  },
  methods: {
    toggle: function () {
      if (this.isFolder) {
        this.open = !this.open
      }
    },
    changeType: function () {
      if (!this.isFolder) {
        Vue.set(this.model, 'children', [])
        this.addChild()
        this.open = true
      }
    },
    addChild: function () {    /*	
    	if (!this.isFolder) {
    		console.log('folder negado');
    		//this.model.children.title=this.model.name;  
      	}
      	if(this.isFolder){
      		console.log(folder);
      	}*/
      this.model.children.push({
        name: 'new stuff'
      })
      this.save(this.model);  
    },

    addText: function () {
      	this.model.children.name=this.model.name;  
      	this.save(this.model);    
    },

    removeChild: function (index) {    	
       // this.model.splice(index, 1);
		//Vue.delete(this.model, index);     
    },
    save: function (model) {   
    console.log(model); 
    	var data_string = JSON.stringify(model);
    	localStorage.setItem('tree',data_string);	    
    }
  }
})

// boot up the demo
var demo = new Vue({
  el: '#demo',
  data: {
    treeData: data
  }
})