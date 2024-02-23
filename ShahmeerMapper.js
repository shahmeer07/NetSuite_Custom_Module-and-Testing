/**
 * ShahmeerMapper.js
 * @NapiVersion 2.x
 * @NModulescope public 
 */

define (['N/record','N/search' , 'N/log'] , function (record,search,log){


    function getValueByKey (type,key) {
        try { 
            const colMapperValue = search.createColumn({ name: 'custrecordmappervalue' });
            var mapperSearch1 = search.create ({
                type: 'customrecordshahmeermapperrecord',
                 filters: [
                ['custrecordmappertype' , 'anyof' , type],
                'AND',
                ['custrecordmapperkey' , 'is' , key]
                ],
                columns: [colMapperValue]
            })

            var results = mapperSearch1.run().getRange({
                start: 0,
                end: 1
            })

            if (results && results.length > 0) {
                log.debug({
                    title: "function getValueByKey result",
                    details: results[0]
                })
                return results[0].getValue(colMapperValue)
                
            } else {
                return null;
            }
        } catch(e){
            log.error({
                title: "Error in Function getValueByKey",
                details: e.message
            })
        }
    }


        
        function getKeyByValue (type,value){
            try {
                var mapperSearch2 = search.create({
                    type: 'customrecordshahmeermapperrecord',
                    filters: [
                        ['custrecordmappertype' , 'is' , type],
                        'AND',
                        ['custrecordmappervalue', 'is', value]
                    ],
                    columns: ['custrecordmapperkey']
                })
                var results = mapperSearch2.run().getRange({ start : 0 , end: 1})
                if (results && results.length > 0) {
                    return results[0].getValue('custrecordmapperkey')
                } else {
                    return null
                }
            }
            catch(e){
                log.error({
                    title: "Error in Function getKeyByValue",
                    details: e.message
                })
            }
        }

        function saveRecord (name,type,value,key){
            try {
                var existingRecord = search.create({
                    type: 'customrecordshahmeermapperrecord',
                    filters: [
                        ['custrecordmappertype', 'is', type],
                        'AND',
                        ['custrecordmapperkey', 'is' , key]
                    ]
                }).run().getRange({ start: 0 , end: 1})
                
                if (existingRecord && existingRecord.length > 0) {
                    var recordId = existingRecord[0].id
                    var record1 = record.load({
                        type: 'customrecordshahmeermapperrecord',
                        id: recordId,
                        isDynamic: true
                    })
                    record1.setValue({
                        fieldId : 'custrecordmappertype' ,
                        value: type
                    })
                    record1.setValue({
                        fieldId : 'custrecordmapperkey' ,
                        value: key
                    })
                    record1.setValue({
                        fieldId : 'custrecordmappervalue' ,
                        value: value
                    })
                    record1.save()
                } else {
                    var newRecord = record.create ({
                        type: 'customrecordshahmeermapperrecord',
                        isDynamic: true
                    })
                    newRecord.setValue({
                        fieldId: 'name',
                        value: name
                    })
                    newRecord.setValue({
                        fieldId : 'custrecordmappertype' ,
                        value: type
                    })
                    newRecord.setValue({
                        fieldId : 'custrecordmapperkey' ,
                        value: key
                    })
                    newRecord.setValue({
                        fieldId : 'custrecordmappervalue' ,
                        value: value
                    })
                    newRecord.save()
                }
            }
            catch(e){
                log.error({
                    title: "Error in Function saveRecord",
                    details: e.message
                })
            }

        }


        function DeleteRecord(recordId) {
            try {
                var existingRecord = record.load({
                    type: 'customrecordshahmeermapperrecord',
                    id: recordId
                })
                if (existingRecord){
                    try {
                        record.delete({
                            type: 'customrecordshahmeermapperrecord',
                            id: recordId
                        })
                    } 
                    catch(e) {
                        log.error ({
                            title: "Error Occured while deleting record",
                            details: e.message
                        })
                    }
                } else {
                    log.error({
                        title: 'Record NOT found',
                        details: 'Record with ' + recordId + ' Not Found!'
                    })
                }
            }
            catch(e){
                log.error({
                    title: "Error in Function DeleteRecord",
                    details: e.message
                })
            }
        }


        function UpdateRecord (recordId,key,value){
            try {
                var existingRecord = record.load({
                    type: 'customrecordshahmeermapperrecord',
                    id: recordId
                })
    
                if (existingRecord){
                    existingRecord.setValue({
                        fieldId : 'custrecordmapperkey',
                        value: key
                    })
                    existingRecord.setValue({
                        fieldId: 'custrecordmappervalue',
                        value: value
                    })
                    existingRecord.save()
                } else {
                    log.error("Record for UpdateRecord was not Found Agaist Id: " + recordId)
                }
            }
            catch(e){
                log.error({
                    title: "Error in function UpdateRecord",
                    details: e.message
                })
            }

        }

        function fetchRecordsByType(type){
            try {
                var searchRecord = search.create({
                    type: 'customrecordshahmeermapperrecord',
                    filters: [
                        ['custrecordmappertype' , 'is' , type]
                    ]
                })
                var results = searchRecord.run().getRange({ start: 0 , end: 10})
    
                var records = results.map(function(result){
                    return {
                        id : result.id,
                        name: result.getValue({name: 'name'}),
                        type: result.getValue({ name: 'custrecordmappertype'}),
                        key: result.getValue({ name: 'custrecordmapperkey'}),
                        value: result.getValue({ name: 'custrecordmappervalue'})
                    }
                })
                return records
            
    
    
    
            }
            catch(e){
                log.error({
                    title: "Error in Function fetchRecordsByType",
                    details: e.message
                })
            }
    }
    return {
        
        getValueByKey : getValueByKey ,
        getKeyByValue : getKeyByValue ,
        UpdateRecord : UpdateRecord ,
        DeleteRecord : DeleteRecord ,
        saveRecord : saveRecord ,
        fetchRecordsByType : fetchRecordsByType

    }
})