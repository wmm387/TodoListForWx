import todoStore from './todoStore'
import noteStore from './noteStore'

export default {
   
   read() {
      todoStore.read()
      noteStore.read()
   },

   save() {
      todoStore.save()
      noteStore.save()
   }
}