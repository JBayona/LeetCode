// Template Render
class TemplateRender {
    constructor(installedTemplates) {
        this.installedTemplates = installedTemplates;
    }
    // Render the final template
    render (secureMessage) {
        const templateId = secureMessage.templateId;    
        return this.parseTemplate(templateId, secureMessage);
    }
    parseTemplate(templateId, secureMessage) {
        let message = this.provideTemplate(templateId);
        let context = secureMessage.context;
        for (let key in context) {
            // Replace single matches
            if (message.indexOf(`{{ ${key} }}`) >= 0) {
              message = message.replace(`{{ ${key} }}`, context[key]);
            } else if (message.indexOf("{{>") >= 0) { // Replace when there's a template
                let newId = message.substring(message.indexOf("{{>") + 4, message.indexOf(" }}"));
                // Get the entire string to replace
                let toReplace = `{{> ${newId} }}`;
                // Recursivelly replace all other templates
                message = message.replace(toReplace, this.parseTemplate(newId, secureMessage));
            }
          }
          return message;
    }
    provideTemplate (templateId) {
        return (templateId in this.installedTemplates) ? this.installedTemplates[templateId] : "TEMPLATE NOT FOUND!";
    }
}

// Part 1
// const locationTemplate = "{{ unit }}-{{ number }} {{ street }} {{ direction }} {{ city }} {{ province }}";
// const reportTemplate = "{{ person1 }} was seen with {{ person2 }} at {{ location1 }} today at {{ time1 }}";
// const installedTemplates= { "report": reportTemplate, "locationTemplate": locationTemplate};
// const context = { "person1": "James", "person2": "John", "location1": "London Bridge", "time1": "0900h" };
// const secureMessage = { templateId: "report", context: context };

// Part 2 - 3 nested templates
let context = { "person1": "Mario", "person2": "George", "time1": "0900h", "unit": "3", "number": "85", "street": "Lawrence Ave", "direction": "S", "city": "Miami", "province": "Florida" , "person3" : "Roberto", "place": "Venice"};
let reportTemplate = "{{ person1 }} was seen with {{ person2 }} at {{> locationTemplate }} today at {{ time1 }}";
let locationTemplate = "{{ unit }}-{{ number }} {{ street }} {{ direction }} {{ city }} {{ province }} {{> warningTemplate }}";
let warningTemplate = "after getting breafkast with {{ person3 }} in Star's coffee located at {{ place }} beach";
let installedTemplates = { "report": reportTemplate, "locationTemplate": locationTemplate, "warningTemplate": warningTemplate};
let secureMessage = { templateId: "report", context: context };

// rendered: "Mario was seen with George at 3-85 Lawrence Ave S Miami Florida today at 0900h"
let templateRender = new TemplateRender(installedTemplates);
console.log(templateRender.render(secureMessage));
