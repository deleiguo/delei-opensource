/*********************
 *** cosplantable ：合并表格相同列
 *********************/
///////////////////////////////////////////////   
//   功能：合并表格   
//   参数：tb－－需要合并的表格ID   
//   参数：colLength－－需要对前几列进行合并，比如，   
//   想合并前两列，后面的数据列忽略合并，colLength应为2      
///////////////////////////////////////////////   
function cosplantable(tb, colLength) {
	//   检查表格是否规整   
	var tableId = tb;
	var tb = document.getElementById(tableId);
	//   检查表格是否规整   
	//	if (!checkTab(tb))
	//		return;
	if (tb != null) {
		var i = 0;
		var j = 0;
		var rowCount = tb.rows.length - 1; // 行数
		var colCount = tb.rows[0].cells.length; // 列数
		var obj1 = null;
		var obj2 = null;
		var objtemp1 = new Array();
		var objtemp2 = new Array();
		var rowCountStart = 0;

		//去除表头行
		for (i = 0; i < rowCount; i++) {
			if (tb.rows[i].cells[0].nodeName == 'TH') {
				rowCountStart++;
			}
		}
		//为每个单元格命名,表头不命名
		for (i = 1; i < rowCount; i++) {
			for (j = 0; j < colCount; j++) {
				if (tb.rows[i].cells[j] != null && tb.rows[i].cells[j].nodeName != 'TH') {
					tb.rows[i].cells[j].id = "tb_" + i.toString() + "_" + j.toString();
				}
			}
		}

		var k = colLength - 1;
		//从后往前检查，进行逐列检查合并,开始列为colLength-1
		for (i = k; i >= 1; i--) {
			//当i>0时有前方的单元格
			if (i > 0) {
				//查找当前单元格前几单元格,l为列值
				var objtemp1 = new Array();
				for (l = 1; l <= i; l++) {
					objtemp1[l] = document.getElementById("tb_1_" + l.toString());
					//alert("objtemp1[" + l + "]" + objtemp1[l].innerText);
				}
			}
			obj1 = document.getElementById("tb_1_" + i.toString());
			for (j = 2; j < rowCount; j++) {
				if (i > 0) {
					//查找当前单元格前几单元格,l为列值
					var objtemp2 = new Array();
					for (l = 1; l <= i; l++) {
						objtemp2[l] = document.getElementById("tb_" + j.toString() + "_" + l.toString());
						//alert("objtemp2[" + l + "]" + objtemp2[l].innerText);
					}
				}
				obj2 = document.getElementById("tb_" + j.toString() + "_" + i.toString());
				//alert(textTrim(obj1.innerText) + "==" + textTrim(obj2.innerText));
				if (obj1 != null && obj2 != null && textTrim(obj1.innerText) == textTrim(obj2.innerText)) {
					if (i > 0) {
						var flag = checkArray(objtemp1, objtemp2);
						if (flag) {
							obj1.rowSpan++;
							obj2.parentNode.removeChild(obj2);
						} else {
							obj1 = document.getElementById("tb_" + j.toString() + "_" + i.toString());
							var objtemp1 = new Array();
							for (l = 1; l <= i; l++) {
								objtemp1[l] = document.getElementById("tb_" + j.toString() + "_" + l.toString());
							}
						}
					} else {
						obj1.rowSpan++;
						obj2.parentNode.removeChild(obj2);
					}
				} else {
					obj1 = document.getElementById("tb_" + j.toString() + "_" + i.toString());
					var objtemp1 = new Array();
					for (l = 1; l <= i; l++) {
						objtemp1[l] = document.getElementById("tb_" + j.toString() + "_" + l.toString());
					}
				}
			}
		}
	}
}

/////////////////////////////////////////   
// 功能：检查表格是否规整
// 参数：tb－－需要检查的表格ID
// ///////////////////////////////////////
function checkTab(tb) {
	if (tb.rows.length == 0) {
		return false;
	}
	//如果只有一行表头也返回false
	if (tb.rows.length == 1) {
		return false;
	}
	if (tb.rows[0].cells.length == 0) {
		return false;
	}
	for ( var i = 0; i < tb.rows.length - 1; i++) {
		if (tb.rows[0].cells.length != tb.rows[i].cells.length) {
			return false;
		}
	}
	return true;
}
