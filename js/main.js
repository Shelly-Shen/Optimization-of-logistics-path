window.onload = function(){
	var create = document.getElementsByClassName("create")[0];
	var oWeight = document.getElementsByClassName("weight")[0];
	var rol = document.getElementsByClassName("rol")[0];
	var table = document.getElementsByClassName("mytable")[0];
	var tableN = document.getElementsByClassName("need")[0];
	var compute = document.getElementsByClassName("compute")[0];
	var load = document.getElementById("load");
	 function getStyle(el, name) {
　 　 if(window.getComputedStyle) {
　 　 　 return window.getComputedStyle(el, null);
　 　 }else{
　 　 　 return el.currentStyle;
　 　 }
　 }
	create.onclick = function(){
				var rolV = parseInt(rol.value);
		for(var i = 0 ;i<rolV;i++){
			var tr = document.createElement("tr");		
			for(var j = 0;j<i+1;j++){
				var td = document.createElement("td");
				td.classList.add("createTd",'createTd'+i+'');
				tr.appendChild(td);
			}
			table.appendChild(tr);
		}
		for(var i = 0 ;i<rolV;i++){
			var td = document.createElement("td");	
			td.classList.add("needTd",'needTd'+i+'');
			tableN.appendChild(td);		
		}
		//需求表
		var oTd = document.getElementsByTagName("td");
		var width = parseInt(getStyle(oTd[0]).width);
		for(var  i =0;i<oTd.length;i++){
			var item = document.createElement("input");
			item.className = "createP";
			item.type = "text";
			item.style.width = width+"px";
			item.style.height = width+"px";	
			oTd[i].appendChild(item);		
		}
	}
	//用户输入最短旅程表数据的表单

	compute.onclick = function(){
	//	var rolV = 13;
		var rolV = parseInt(rol.value);
		var arr = new Array();
		var arr2 = new Array();
		var dWeight = parseInt(oWeight.value);
		for(var k = 0;k<rolV;k++){
			arr[k] = new Array();
			var createTdi = document.getElementsByClassName('createTd'+k+'');
			for(var j=0;j<k+1;j++){
					
				//arr[k][j] = parseInt(createTdi[j].children[0].innerHTML); 
				arr[k][j] = parseInt(createTdi[j].children[0].value); 
			}
		}
		//最短旅程表
		for(var k = 0;k<rolV;k++){
			arr2[k] = new Array();
			for(var j=0;j<k+1;j++){
				if(j == 0){
					arr2[k][j] = 0;
				}else{
					arr2[k][j] = arr[j-1][0] + arr[k][0] - arr[k][j];
				}
			}
		}
		//节约旅程表
		console.log(arr2);
		var maxarr = [];
		var indexarr = new Array();
		function maxObj(){

		}
		for(var k = 1;k<rolV;k++){
			for(var j=1;j<k+1;j++){
				maxarr.push(arr2[k][j]);
			}
		}
		//节约旅程表一维数组
		var flag = 2;
		var num = 1;
		var rolV_1 = (rolV-1)+((rolV-1)*(rolV-2))/2;
		for(var i=0;i<rolV_1;i++){
			indexarr[i] = new Array();
			indexarr[i][0] = num; 
			indexarr[i][1] = flag;
			if(indexarr[i][0] == indexarr[i][1]-1){
				num = 1;
				flag++;
			}else{
				num++;
			}
		}
		//节约旅程表索引的二维数组

		var data = Object();
		var dkey,dval;
		for(var i=0;i<rolV_1;i++){
			dkey = indexarr[i];
			dval = maxarr[i];
			data[dkey] = dval;
		}
		function findKey (value, compare = (a, b) => a === b) {
			return Object.keys(data).find(k => compare(data[k], value))
		}
		var newval = Object.values(data).sort((a,b)=>b-a);
		var newkey;
		var newObj = new Map();
		for(var i = 0; i < rolV_1; i++) {
           	//遍历newkey数组
           	newkey = findKey(newval[i]);
			delete(data[newkey]);
			//删除的目的是同值不被覆盖
            newObj.set(newkey.split(",") ,newval[i]); 
            //向新创建的对象中按照排好的顺序依次增加键值对
        }
        var indexSort = [...newObj.keys()];
        //console.log(indexSort);
        //将map对象的key转为数组方便取出数据
        //节约旅程表排序后的索引
        var needArr = [];
        for(var i=0;i<rolV;i++){
        	needArr.push(tableN.children[i].children[0].value);
        }
		var loadarr = new Array();
		for(var i = 0 ;i<20;i++){
			loadarr[i] = new Array();
			for(var j = 0;j<1;j++){
			}
		}     
		 var index = 0;
		 indexSort.splice(2,1);
        //需求量数组
        function main(index){
        	var neednum,prev,next,delN,needSum,colrow,flag;
        	prev = indexSort[0][0];
        	next = indexSort[0][1];
        	loadarr[index].push(prev);
        	loadarr[index].push(next);
        	indexSort.splice(0,1);
        	needSum = parseInt(needArr[prev-1])+parseInt(needArr[next-1]);
        	function findNext(){
        		if(indexSort.length!=0){
        		let i;
        		for(i = 0;i<indexSort.length;i++){
        			 if(parseInt(indexSort[i][1]) == parseInt(prev)||parseInt(indexSort[i][1]) == parseInt(next)||parseInt(indexSort[i][0]) == parseInt(prev) || parseInt(indexSort[i][0]) == parseInt(next)){
		        		if(indexSort[i].indexOf(prev)!=-1){
		        			delN = indexSort[i][indexSort[i].indexOf(prev)];
		        			prev = indexSort[i][indexSort[i].indexOf(prev)-1]?indexSort[i][indexSort[i].indexOf(prev)-1]:indexSort[i][indexSort[i].indexOf(prev)+1];
		        			loadarr[index].unshift(prev);
		        			needSum += parseInt(needArr[prev-1]); 
		        			flag = 0;
		        		}else if(indexSort[i].indexOf(next)!=-1){
		        			delN = indexSort[i][indexSort[i].indexOf(next)];
		        			next = indexSort[i][indexSort[i].indexOf(next)-1]?indexSort[i][indexSort[i].indexOf(next)-1]:indexSort[i][indexSort[i].indexOf(next)+1];
		        			loadarr[index].push(next);
		        			needSum += parseInt(needArr[next-1]);
		        			flag = 1;
		        		}      
		        		indexSort.splice(i,1);
		        		i--;
		        		function delNF(num){
			        	for(var m = 0;m<indexSort.length;m++){
			        		if(parseInt(indexSort[m][0]) == num||parseInt(indexSort[m][1]) == num){
			        			indexSort.splice(m,1);
			        			if(m!=0){
			        				m--;
			        			}
			        			//二维数组用splice方法以后会跳过前一个数则m--
			        		}
			        		if((indexSort[m][0] == prev||indexSort[m][0] == next)&&(indexSort[m][1] == prev||indexSort[m][1] ==next)){
			        			indexSort.splice(m,1);
			        			if(m!=0){
			        				m--;
			        			}
			        		}
			        		
			        	}
	        		} 
        		 		
		    			if(needSum < dWeight){
		        				delNF(delN);
		        		}else{
							if(flag == 0){
								needSum -= parseInt(needArr[prev-1]);
								prev = delN;
							loadarr[index].shift();								
							}else if(flag == 1){
								needSum -= parseInt(needArr[next-1]);
								next = delN;
								delN = 0;
							loadarr[index].pop();
							}
		        		}
		        	/*if(i == indexSort.length-1){
	        			delNF(prev);
	        			delNF(next);
		       			//return loadarr[index];
        			}*/
        			}
        		}
        	
        	}
        }
        	findNext();
        	console.log(loadarr[index].join("-"));
        	var itemload =  document.createElement("p");
        	itemload.innerHTML = loadarr[index].join("-");
        	load.appendChild(itemload);
        	if(indexSort.length != 0){
        		main(++index);
        	}
        } 
        main(0); 
	}
}