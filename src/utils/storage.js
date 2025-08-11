export function save(key,value){
  localStorage.setItem(key,JSON.stringify(value));
}
export function load(key,def=null){
  const v=localStorage.getItem(key);
  return v?JSON.parse(v):def;
}
export function clear(){
  localStorage.clear();
}
