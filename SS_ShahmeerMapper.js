/**
 * @NApiversion 2.x
 * @NScriptType ScheduledScript
 */

define (['N/record' , './ShahmeerMapper'] ,  function (record,ShahmeerMapper) {
    
    function getValueByKeyImplementation (){
        try {
            var key = '122'
            var type = 3 // list type 3 has the internal id '3' in custom list
            var value = ShahmeerMapper.getValueByKey(type,key)
            log.debug('Value for key ' + key + ' and Type ' + type + ' : ' , value)
        }
        catch(e) {
            log.error({
                title: "Error in Function getValueByKeyImplementation: ",
                details: e.message
            })
        }
    }
    function getKeyByValueImplementation (){
        try {
            var valueToFind = 'BZ';
            var type = 3
            var keyFound = ShahmeerMapper.getKeyByValue(type, valueToFind);
            log.debug('Key for value ' + valueToFind + ' and Type ' + type + ': ', keyFound);
        }
        catch(e) {
            log.error({
                title: "Error in Function getKeyByValueImplementation: ",
                details: e.message
            })
        }
    }
    
    function saveRecordImplementation (){
        try {
            var name = 'SHAHMEER"S Record Name ';
            var newValue = 'New Value Implemented';
            var newKey = 'New Key Implemented';
            var type = 76
            ShahmeerMapper.saveRecord(name, type, newValue, newKey)
            }   
            catch(e) {
            log.error({
                title: "Error in Function saveRecordImplementation: ",
                details: e.message
            })
        }
    }

    function DeleteRecordImplementation(){
        try {
            var recordIdToDelete = '9'; 
            ShahmeerMapper.DeleteRecord(recordIdToDelete);
        }
        catch(e) {
            log.error({
                title: "Error in Function DeleteRecordImplementation: ",
                details: e.message
            })
        }
    }
    
    function UpdateRecordImplementation(){
        try {
            var recordIdToUpdate = '10'; 
            var updatedKey = 'Updated Key latest';
            var updatedValue = 'Updated Value latest';
            ShahmeerMapper.UpdateRecord(recordIdToUpdate, updatedKey, updatedValue);
        }
        catch(e) {
            log.error({
                title: "Error in Function UpdateRecordImplementation: ",
                details: e.message
            })
        }
    }

    function fetchRecordsByTypeImplementation(){
        try{
            var type = 3
            var records = ShahmeerMapper.fetchRecordsByType(type);
            log.debug('Records for type ' + type + ': ', records);
        }
        catch(e){
            log.error({
                title: "Error in Function fetchRecordsByTypeImplementation: ",
                details: e.message
            })
        }
    }

    
    function execute (context){
        getValueByKeyImplementation()
        getKeyByValueImplementation()
        saveRecordImplementation()
        DeleteRecordImplementation()
        UpdateRecordImplementation()
        fetchRecordsByTypeImplementation()

    }
    return {
        execute : execute
    }
})