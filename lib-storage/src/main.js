/**
 * saveObject("test1", [0, 1, 2])
 * saveObject("test2", [{ id: 1, name: "A" }, { id: 2, name: "B" }])
 */
const saveObject = function(Name, Data){
  localStorage.setItem(Name, JSON.stringify(Data))
}

const loadObject = function(Name){
  var string = localStorage.getItem(Name)
  return string ? JSON.parse(string) : []
}

export default {
  saveObject,
  loadObject,
}
