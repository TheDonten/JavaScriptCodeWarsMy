
const find_free = (element,index, array) => {
    if(element.free === true){
        return true;
    }
    return false;
};

const find_min_nonNull = (array) => {
  if(array.length === 1){
    return 0;
  }
  let min_element = array.quque_time;
  let index = 0;
  
  for (let i = 1; i < array.length; i++){
     if(min_element > array[i].quque_time){
       min_element = array[i].quque_time;
       index = 1;
     }
  }
  if(min_element === 0){
    return -1;
  }
  return index;
}


function queueTime(customers, n) {
    //TODO
   
    let array_checkout = [];
    let check_out_time = [];
    for(let i = 0; i < n; i++){
        check_out_time.push({all_time : 0,quque_time : 0, free : true});
    }
    // check_out_time[0].quque_time = 5;
    // check_out_time[1].quque_time = 2;
    // check_out_time[2].quque_time = 1;
    let prom = 0;
    let max_of_time = 0;
    let index_min_of_time = 0;
    let que_get = 0; //это сколько клиентов обслужено, по факту если он на кассе, то считается что он уже обслужен
    let max_client = 0; // это сколько сейчас клиентов на кассах
    let this_index = 0;
    let free_client = 0;
    while (que_get <= customers.length || max_client !== 0){
        while (max_client !== n && que_get <= customers.length){
            this_index = check_out_time.findIndex(find_free);
            check_out_time[this_index].free = false;
            check_out_time[this_index].quque_time = customers[que_get];
            check_out_time[this_index].all_time += customers[que_get];
            que_get += 1;
            max_client += 1;
        }

//         index_min_of_time = check_out_time.indexOf(check_out_time.reduce( (IMax,curr,index,array) => {
//             return curr.quque_time < IMax.quque_time ? curr : IMax;
//         }));

        index_min_of_time = find_min_nonNull(check_out_time);

        if(index_min_of_time === -1){
          break;
        }
      
        max_of_time += check_out_time[index_min_of_time].quque_time;
        prom = check_out_time[index_min_of_time].quque_time;
        
        check_out_time.forEach( (currentValue) => {
            currentValue.quque_time -= prom;
            if(currentValue.quque_time <= 0){
                currentValue.free = true;
                currentValue.quque_time = 0;
                max_client -= 1;
            }
        })
    }
    // console.log(check_out_time.findIndex(find_free));
    // console.log(check_out_time.findIndex(queueTime))

    return max_of_time;
  
}
