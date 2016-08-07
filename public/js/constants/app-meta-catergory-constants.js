module.exports = {
    "Receipts" : [{
            "fields": ["Date","Location","Receipt Category","Total paid"]
        },{
            "Date"  : "date"
        },{
            "Location" : "text"
        },{
            "Receipt Category": {
                "values" : [
                    "Meal","Taxi","Hotel room","Laundry","Airfare"
                ]
            }
        },{
            "Total paid" : "number"
        }
    ],
    "Warranties" : [{
            "fields":["Make","Model","Serial Number","Date purchased","Owner’s name", "Owner’s address", "Owner’s email", "Owner’s address"]
        },{
            "Make":"text"
        },{
            "Model" : "text"
        },{
            "Serial Number" : "text"
        },{
            "Date purchased" : "date"
        },{
            "Owner’s name" : "text"
        },{
            "Owner’s address" : "text"
        },{
            "Owner’s email" : "email"
        },{
            "Owner’s address" : "text"
    }],
    "Tax Doc" : [{
            "fields":["Tax Doc Type","Date Issued","Tax Year"]
        },{
        "Tax Doc Type" : {
            "values" : [
                "W2", "W9", "1099"
            ]
        }
        },{
            "Date issued" : "date"
        },{
            "Tax year" : "number"
        }
    ],
    "Edu. Credentials":[{
            "fields" : ["Institute", "Certificate Title", "Certificate Type"]
        },{
            "Institute" : "text"
        },{
            "Certificate Title" : "text"
        },{
            "Certificate Type" : {
                "values" : [ "Undergrad", "Postgraduate" , "Doctorate" , "Diploma" ]
            }
        }
    ]

}