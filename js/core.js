/* получаем всю информацию из списка, формируем массив formattedResults вида
 * 'название специальности' => array[] {[0] => 'название предмета', [1] => 'баллы за предмет'}
 */
function retreiveListData(url, old_results) {
	var url = url;
	var eventData = {
		events : []
	};

	/* цикл по всем элементам => посылаем через ajax, получаем данные и ссылку
	 * на дальнейшие данные => конкатинируем со старыми данными => снова посылаем запрос
	 * и т.д. до тех пор, пока есть ссылка на следующий ресурс
	 */
	if (url != undefined || url != null) {
		$.ajax({
			type : "get",
			dataType : "json",
			url : url,
			headers : {
				"ACCEPT" : "application/json;odata=verbose"
			},
			error : function() {
				return null;
			},
			success : function(doc) {
				var results = doc.d.results;
				if (old_results != null)
					results = results.concat(old_results);
				retreiveListData(doc.d.__next, results);
			}
		});
	} else {
		var results = old_results;
		var formattedResults = {};
		var counter = 0;
		$.each(results, function(i, e) {
			var url = e.FieldValuesAsText.__deferred.uri;
			
			$.ajax({
				type : "get",
				dataType : "json",
				url : url,
			headers : {
				"ACCEPT" : "application/json;odata=verbose"
			},
			error : function() {
				return null;
			},	
			success : function(doc) {
				var subjectInfo = [];
				//поле с названием предмета
				subjectInfo[0] = doc.d.OData__x005f_x041f_x005f__x005f_x0440_x005f__x005f_x0435_x005f__x005f_x0434_x005f__x005f_x04;
				//поле с баллами за предмет
				subjectInfo[1] = doc.d.OData__x005f_x0411_x005f__x005f_x0430_x005f__x005f_x043b_x005f__x005f_x043b_x005f__x005f_x04;
				
				var specName = doc.d.OData__x005f_x0421_x005f__x005f_x043f_x005f__x005f_x0435_x005f__x005f_x0446_x005f__x005f_x04;
				
				if(formattedResults[specName] == undefined)
					formattedResults[specName] = [];
					
				formattedResults[specName].push(subjectInfo);
				
				counter++;
				if(counter == results.length){
					printSpecsInfoFormatted(formattedResults);
				}
				
			}
			});
		});
	}
}

/*
 * выводит сформированный массив с таблицу с id = spec_list
 */
function printSpecsInfoFormatted(specs) {
	$.each(specs, function(specName, subjs){
		$.each(subjs, function(i, subj) {
			$('#spec_list').append(
				"<tr><td>" + specName +
				"<td>" + subj[0] + "<td>" +
			 	"<td>" + subj[1] + "<td></tr>"
		 	);		
		});
	});
}

$(document).ready(function(){
	// передаем ссылку на список => элементы по идентификатору списка
	debugger;
	retreiveListData("http://example.ru/_api/web/lists(guid'41E4C036-7C64-4B05-86D8-207F6864CA10')/Items",null);
});
