// demo data

var datatree = {
  name: 'MyTree',
  subItem:false,
  children: [
    { name: 'hello2' },
    { name: 'wat2' },
    {
      name: 'child_folderpddre',
       subItem:true,
      children: [
        {
          name: 'child_folde_hijo',
          subItem:true,
          children: [
            { name: 'hello23' },
            { name: 'wat23' }
          ]
        },
        { name: 'hello24' },
        { name: 'wat24' },
        {
          name: 'child_folder_hijo_2',
          subItem:true,
          children: [
            { name: 'hello25' },
            { name: 'wat3' }
          ]
        }
      ]
    }
  ]
}

if(!localStorage.getItem('tree')){
    var data_string = JSON.stringify(datatree);
    localStorage.setItem('tree', data_string);
}

var data = JSON.parse(localStorage.getItem("tree"));

// define the item component
Vue.component('item', {
  template: '#item-template',
  props: {
    model: Object
  },
  data: function () {
    return {
      open: false,
      Completed: false,
    }
  },
  computed: {
    isFolder: function () {
      return this.model.children &&
        this.model.children.length
    },
   
  },

  methods: {
    toggle: function () {
      if (this.isFolder) {
        this.open = !this.open
      }
    },
     isComplet: function () {
       this.Completed=!this.Completed; 
    },
    changeType: function () {
      if (!this.isFolder) {
        Vue.set(this.model, 'children', [])
        this.addChild()
        this.open = true
      }
    },
    addChild: function () {    
      this.model.children.push({
        name: 'nueva tarea'
      })
      this.save();  
    },

    checked: function () {
       //Vue.set(this.model, 'name', this.model.name);
          
    },

    addText: function () {
       //Vue.set(this.model, 'name', this.model.name);
        this.model.name=this.model.name;  
      	this.save();    
    },

    removeChild: function (index) {   
      console.log(this.model);
      //this.$delete(this.todos, index)
        //model.$remove('asdasdasdop') 	        
		    //Vue.delete(this.model);     
    },
    save: function () {   
      this.$parent.save()    	    
    }
  }
})

// boot up the demo
var demo = new Vue({
  el: '#demo',
  data: {
    treeData: data
  },
  methods:{
    save: function () {   
      var data_string = JSON.stringify(this.treeData);
      localStorage.setItem('tree',data_string); 
    }

  }
})