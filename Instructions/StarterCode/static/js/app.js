var ddOptions=[]
var samples = []
d3.json("../data/samples.json").then(function(sampleData){
    console.log(sampleData);
    // var loopthrough = data.samples
    samples = sampleData
    console.log(samples)
    ddOptions = sampleData.names
    demoInfo = sampleData.metadata
    console.log(ddOptions)
    ddOptions.forEach(function(c) {
        var x = d3.select("#selDataset");
        x.append("option").text(c).attr("value", c);
    })
    topTenBar();
})

var button = d3.select("#selDataset");
button.on("change",topTenBar)

function topTenBar() {
    sample = d3.select("#selDataset").property("value");
    console.log(sample)
    var values = []
    var labels = []
    var hover = []
    var index = ddOptions.indexOf(sample)
    console.log(index)
    console.log(samples.samples[index])
    var numSamples = samples.samples[index].otu_ids.length
    console.log(`Length: ${numSamples}`)
    if(numSamples > 10) {   
        for(i=0; i<10;i++){
            //console.log(samples.samples[index].otu_ids[i])
            labels.push(samples.samples[index].otu_ids[i])

            //console.log(samples.samples[index].otu_labels[i])
            hover.push(samples.samples[index].otu_labels[i])

            //console.log(samples.samples[index].sample_values[i])
            values.push(samples.samples[index].sample_values[i])
            }
        }
    else {
        for(i=0; i<numSamples;i++){
            //console.log(samples.samples[index].otu_ids[i])
            labels.push(samples.samples[index].otu_ids[i])

            //console.log(samples.samples[index].otu_labels[i])
            hover.push(samples.samples[index].otu_labels[i])
            
            //console.log(samples.samples[index].sample_values[i])
            values.push(samples.samples[index].sample_values[i])
        }
    }
    console.log(`values ${values}`)
    console.log(label)
    console.log(`hover is cool:${hover}`)
    console.log("Washing Freq")
    console.log(demoInfo[index].wfreq)
    var data = [{
        x: values,
        y: label,
        type: 'bar',
        orientation: 'h',
        text: hover
    }]
    var layout ={
        title: "Top 10 Bacteria Cultures Found",
        yaxis: {
            type: 'category',
            autorange:'reversed'
        }
    }
    Plotly.newPlot('bar',data,layout)


    demos = d3.select("#sample-metadata")
    Object.entries(demoInfo[index]).forEach(function([key,value]){
        // change keys to uppercase
        demos.append("div").text(`${key.toUpperCase()}: ${value}`).style("text-align","left")
    })

    // console.log(demoInfo[index])
    // demos.append("ul").text(`ID: ${demoInfo[index].id}`)
    // console.log(`ID: ${demoInfo[index].id}`)
    // console.log(`ID: ${demoInfo[index].ethnicity}`)
    // demos.append("ul").text(`ETHNICITY: ${demoInfo[index].ethnicity}`)
    // console.log(`ID: ${demoInfo[index].gender}`)
    // console.log(`ID: ${demoInfo[index].age}`)
    // console.log(`ID: ${demoInfo[index].location}`)
    // const otu_ids = sample;
    // const otu_labels = label;
    // const sample_values = hover;
    let bubbleData = [
        {
        x: labels,
        y: values,
        text: hover,
        mode: "markers",
        marker: {
            size: values,
            color: labels,
            colorscale: "Rainbow"
        }
        }
    ]
    let bubbleLayout = {
        title: 'Bacteria Cultures Per Sample',
        // margin: { t: 0 },
        hovermode: 'closests',
        xaxis: { title: 'OTU ID'}
        
        }
    Plotly.newPlot("bubble", bubbleData, bubbleLayout);
    
}
// select an html element
//create a change event
//trigger function to return the top 10
//generate the graphic
console.log(`samples : ${samples}`)
// samples.forEach(function(c) {
//     var x = d3.select("#selDataset");
//     x.append("option").text(c).attr("value", c);
// })
// function grabstop10 (sampobj){
//     //get index of selection and then grab info
    
    
//     data.samples[index]
//         //do stuff


// }


