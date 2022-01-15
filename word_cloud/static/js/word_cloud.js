//Simple animated example of d3-cloud - https://github.com/jasondavies/d3-cloud
//Based on https://github.com/jasondavies/d3-cloud/blob/master/examples/simple.html

// Encapsulate the word cloud functionality
function wordCloud(selector) {

  var fill = d3.scale.category20();

  //Construct the word cloud's SVG element
  var svg = d3.select(selector).append("svg")
      .attr("width", 500)
      .attr("height", 500)
      .append("g")
      .attr("transform", "translate(250,250)");


  //Draw the word cloud
  function draw(words) {
      var cloud = svg.selectAll("g text")
                      .data(words, function(d) { return d.text; })

      //Entering words
      cloud.enter()
          .append("text")
          .style("font-family", "Impact")
          .style("fill", function(d, i) { return fill(i); })
          .attr("text-anchor", "middle")
          .attr('font-size', 1)
          .text(function(d) { return d.text; });

      //Entering and existing words
      cloud
          .transition()
              .duration(600)
              .style("font-size", function(d) { return d.size + "px"; })
              .attr("transform", function(d) {
                  return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
              })
              .style("fill-opacity", 1);

      //Exiting words
      cloud.exit()
          .transition()
              .duration(200)
              .style('fill-opacity', 1e-6)
              .attr('font-size', 1)
              .remove();
  }


  //Use the module pattern to encapsulate the visualisation code. We'll
  // expose only the parts that need to be public.
  return {

      //Recompute the word cloud for a new set of words. This method will
      // asycnhronously call draw when the layout has been computed.
      //The outside world will need to call this function, so make it part
      // of the wordCloud return value.
      update: function(words) {
          d3.layout.cloud().size([500, 500])
              .words(words)
              .padding(5)
              .rotate(function() { return ~~(Math.random() * 2) * 90; })
              .font("Impact")
              .fontSize(function(d) { return d.size; })
              .on("end", draw)
              .start();
      }
  }

}

var words = [
  "Affenpinscher, Stubborn, Curious, Playful, Adventurous, Active, Fun-loving.",
  "Afghan Hound, Aloof, Clownish, Dignified, Independent, Happy.",
  "African Hunting Dog, Wild, Hardworking, Dutiful.",
  "Airedale Terrier, Outgoing, Friendly, Alert, Confident, Intelligent, Courageous.", 
  " Akbash Dog, Loyal, Independent, Intelligent, Brave.", 
  "Akita, Docile, Alert, Responsive, Dignified, Composed, Friendly, Receptive, Faithful, Courageous.",
  "Alapaha Blue Blood Bulldog, Loving, Protective, Trainable, Dutiful, Responsible", 
  "Alaskan Husky	Friendly, Energetic, Loyal, Gentle, Confident",
  "Alaskan Malamute	Friendly, Affectionate, Devoted, Loyal",
  "American Bulldog	Friendly, Assertive, Energetic, Loyal, Gentle",
  "American Bully,	Strong Willed, Stubborn, Friendly, Clownish",
  "American Eskimo Dog,	Friendly, Alert, Reserved, Intelligent",
  "American Eskimo Dog (Miniature),	Friendly, Alert, Reserved, Intelligent",
  "American Foxhound,	Kind, Sweet-Tempered, Loyal, Independent",
  "American Pit Bull Terrier,	Strong Willed, Stubborn, Friendly, Clownish",
  "American Staffordshire Terrier,	Tenacious, Friendly, Devoted, Loyal, Attentive",
  "American Water Spaniel,	Friendly, Energetic, Obedient, Intelligent",
  "Anatolian Shepherd Dog,	Steady, Bold, Independent, Confident, Intelligent",
  "Appenzeller Sennenhund,	Reliable, Fearless, Energetic, Lively",
  "Australian Cattle Dog,	Cautious, Energetic, Loyal, Obedient",
  "Australian Kelpie,	Friendly, Energetic, Alert, Loyal, Intelligent",
  "Australian Shepherd,	Good-natured, Affectionate, Intelligent, Active",
  "Australian Terrier,	Spirited, Alert, Loyal, Companionable",
  "Azawakh,	Aloof, Affectionate, Attentive, Rugged, Fierce",
  "Barbet,	Obedient, Companionable, Intelligent, Joyful",
  "Basenji,	Affectionate, Energetic, Alert, Curious",
  "Basset, Bleu de Gascogne	Affectionate, Lively, Agile, Curious, Happy",
  "Basset, Hound	Tenacious, Friendly, Affectionate, Devoted",
  "Beagle,	Amiable, Even Tempered, Excitable, Determined",
  "Bearded Collie, Self-confidence, Hardy, Lively, Alert",
  "Beauceron,	Fearless, Friendly, Intelligent, Protective, Calm",
  "Bedlington Terrier,	Affectionate, Spirited, Intelligent",
  "Belgian Malinois,	Watchful, Alert, Stubborn, Friendly, Confident",
"Belgian Tervuren,	Energetic, Alert, Loyal, Intelligent, Attentive",
"Bernese Mountain Dog, Affectionate, Loyal, Intelligent, Faithful",
"Bichon Frise	Feisty, Affectionate, Cheerful, Playful",
"Black and Tan Coonhound,	Easygoing, Gentle, Adaptable, Trusting",
"Bloodhound,	Stubborn, Affectionate, Gentle, Even Tempered",
"Bluetick Coonhound,	Friendly, Intelligent, Active",
"Boerboel,	Obedient, Confident, Intelligent, Dominant",
"Border Collie,	Tenacious, Keen, Energetic, Responsive",
"Border Terrier,	Fearless, Affectionate, Alert, Obedient",
"Boston Terrier,Friendly, Lively, Intelligent",
"Bouvier des Flandres	Protective, Loyal, Gentle, Intelligent",
"Boxer,	Devoted, Fearless, Friendly, Cheerful",
"Boykin Spaniel,	Friendly, Energetic, Companionable",
"Bracco Italiano,	Stubborn, Affectionate, Loyal, Playful",
"Briard	Fearless, Loyal, Obedient, Intelligent",
"Brittany	Agile, Adaptable, Quick, Intelligent",
"Bull Terrier,	Trainable, Protective, Sweet-Tempered, Keen",
"Bull Terrier, (Miniature),	Trainable, Protective, Sweet-Tempered, Keen",
"Bullmastiff,	Docile, Reliable, Devoted, Alert, Loyal",
"Cairn Terrier,	Hardy, Fearless, Assertive, Gay, Intelligent",
"Cane Corso,	Trainable, Reserved, Stable, Quiet", 
"Cardigan Welsh Corgi,	Affectionate, Devoted, Alert, Companionable",
"Catahoula Leopard Dog,	Energetic, Inquisitive, Independent, Gentle",
"Caucasian Shepherd (Ovcharka),	Alert, Quick, Dominant, Powerful, Calm, Strong",
"Cavalier King Charles Spaniel,	Fearless, Affectionate, Sociable, Patient", 
"Chesapeake Bay Retriever,	Affectionate, Intelligent, Quiet, Dominant",
"Chinese Crested,	Affectionate, Sweet-Tempered, Lively, Alert",
"Chinese Shar-Pei,	Suspicious, Affectionate, Devoted, Reserved",
"Chinook,	Friendly, Alert, Dignified, Intelligent, Calm",
"Chow Chow,	Aloof, Loyal, Independent, Quiet",
"Clumber Spaniel,	Affectionate, Loyal, Dignified, Gentle, Calm",
"Cocker Spaniel,	Trainable, Friendly, Affectionate, Playful",
"Cocker Spaniel, (American)	Outgoing, Sociable, Trusting, Joyful",
"Coton de Tulear,	Affectionate, Lively, Playful, Intelligent", 
"Dalmatian,	Outgoing, Friendly, Energetic, Playful",
"Doberman Pinscher,	Fearless, Energetic, Alert, Loyal, Obedient", 
"Dutch Shepherd,	Reliable, Affectionate, Alert, Loyal, Obedient",
"English Setter,	Strong Willed, Mischievous, Affectionate", 
"English Shepherd,	Kind, Energetic, Independent, Adaptable", 
"English Springer Spaniel,	Affectionate, Cheerful, Alert, Intelligent", 
"English Toy Spaniel,	Affectionate, Reserved, Playful, Gentle, Happy",
"English Toy Terrier,	Stubborn, Alert, Companionable, Intelligent",
"Eurasier,	Alert, Reserved, Intelligent, Even Tempered",
"Field Spaniel,	Docile, Cautious, Sociable, Sensitive",
"Finnish Lapphund,	Friendly, Keen, Faithful, Calm, Courageous",
"Finnish Spitz,	Playful, Loyal, Independent, Intelligent",
"French Bulldog,	Playful, Affectionate, Keen, Sociable, Lively",
"German Pinscher,	Spirited, Lively, Intelligent, Loving", 
"German Shepherd Dog,	Alert, Loyal, Obedient, Curious, Confident", 
"German Shorthaired Pointer,	Boisterous, Bold, Affectionate, Intelligent", 
"Giant Schnauzer,	Strong Willed, Kind, Loyal, Intelligent",
"Giant Schnauzer,	Strong Willed, Kind, Loyal, Intelligent", 
"Glen of Imaal Terrier,	Spirited, Agile, Loyal, Gentle, Active",
"Golden Retriever,	Intelligent, Kind, Reliable, Friendly", 
"Gordon Setter,	Fearless, Alert, Loyal, Confident, Gay",
"Great Dane,	Friendly, Devoted, Reserved, Gentle, Confident",
"Great Pyrenees,	Strong Willed, Fearless, Affectionate, Patient",
"Greyhound,	Affectionate, Athletic, Gentle, Intelligent",
"Griffon Bruxellois,	Self-important, Inquisitive, Alert",
"Harrier,	Outgoing, Friendly, Cheerful, Sweet-Tempered",
"Havanese,	Affectionate, Responsive, Playful",
"Irish Setter,	Affectionate, Energetic, Lively, Independent",
"Irish Terrier,	Respectful, Lively, Intelligent, Dominant",
"Irish Wolfhound,	Sweet-Tempered, Loyal, Dignified, Patient", 
"Italian Greyhound,	Mischievous, Affectionate, Agile, Athletic", 
"Japanese Chin,	Alert, Loyal, Independent, Intelligent, Loving",
"Japanese Spitz,	Affectionate, Obedient, Playful, Companionable",
"Keeshond,	Agile, Obedient, Playful, Quick, Sturdy, Bright",
"Komondor,	Steady, Fearless, Affectionate, Independent",
"Kooikerhondje,	Benevolent, Agile, Alert, Intelligent, Active",
"Kuvasz,	Clownish, Loyal, Patient, Independent", 
"Labrador Retriever,	Kind, Outgoing, Agile, Gentle, Intelligent", 
"Lagotto Romagnolo,	Keen, Loyal, Companionable, Loving, Active",
"Lancashire, Heeler	Clever, Friendly, Alert, Intelligent",
"Leonberger,	Obedient, Fearless, Loyal, Companionable", 
"Lhasa Apso,	Steady, Fearless, Friendly, Devoted, Assertive",
"Maltese,	Playful, Docile, Fearless, Affectionate, Sweet",
"Miniature American Shepherd,	Energetic, Loyal, Intelligent, Trainable",
"Miniature Pinscher,	Clever, Outgoing, Friendly, Energetic",
"Miniature Schnauzer,	Fearless, Friendly, Spirited, Alert, Obedient",
"Newfoundland,	Sweet-Tempered, Gentle, Trainable",
"Norfolk Terrier,	Self-confidence, Fearless, Spirited, Companion",
"Norwich Terrier,	Hardy, Affectionate, Energetic, Sensitive",
"Nova Scotia Duck Tolling Retriever,	Outgoing, Alert, Patient, Intelligent, Loving",
"Old English Sheepdog,	Sociable, Bubbly, Playful, Adaptable, Intelligent",
"Olde English Bulldogge,	Friendly, Alert, Confident, Loving, Courageous",
"Papillon,	Hardy, Friendly, Energetic, Alert, Intelligent",
"Pekingese,	Opinionated, Good-natured, Stubborn, Affectionate",
"Pembroke Welsh Corgi,	Tenacious, Outgoing, Friendly, Bold, Playful",
"Perro de Presa Canario,	Strong Willed, Suspicious, Gentle, Dominant, Calm",
"Pharaoh Hound,	Affectionate, Sociable, Playful, Intelligent",
"Plott,	Bold, Alert, Loyal, Intelligent",
"Pomeranian,	Extroverted, Friendly, Sociable, Playful",
"Pug,	Docile, Clever, Charming, Stubborn, Sociable",
"Puli,	Energetic, Agile, Loyal, Obedient, Intelligent",
"Pumi,	Lively, Reserved, Intelligent, Active, Protective",
"Rat Terrier,	Affectionate, Lively, Inquisitive, Alert",
"Redbone Coonhound,	Affectionate, Energetic, Independent",
"Rhodesian Ridgeback,	Strong Willed, Mischievous, Loyal, Dignified",
"Rottweiler,	Steady, Good-natured, Fearless, Devoted, Alert",
"Saint Bernard,	Friendly, Lively, Gentle, Watchful, Calm",
"Saluki,	Aloof, Reserved, Intelligent, Quiet",
"Samoyed,	Stubborn, Friendly, Sociable, Lively, Alert",
"Schipperke,	Fearless, Agile, Curious, Independent, Confident",
"Scottish Deerhound,	Docile, Friendly, Dignified, Gentle",
"Scottish Terrier,	Feisty, Alert, Independent, Playful, Quick",
"Shetland Sheepdog,	Affectionate, Lively, Responsive, Alert, Loyal",
"Shiba Inu,	Charming, Fearless, Keen, Alert, Confident",
"Shih Tzu,	Clever, Spunky, Outgoing, Friendly, Affectionate",
"Shiloh Shepherd,	Outgoing, Loyal, Companionable, Gentle, Loving",
"Siberian Husky,	Outgoing, Friendly, Alert, Gentle, Intelligent",
"Silky Terrier,	Friendly, Responsive, Inquisitive, Alert, Quick",
"Smooth Fox Terrier,	Fearless, Affectionate, Alert, Playful",
"Soft Coated Wheaten Terrier,	Affectionate, Spirited, Energetic, Playful",
"Spanish Water Dog,	Trainable, Diligent, Affectionate, Loyal",
"Spinone Italiano,	Docile, Friendly, Affectionate, Loyal, Patient",
"Staffordshire Bull Terrier	,Reliable, Fearless, Bold, Affectionate, Loyal",
"Standard Schnauzer,	Trainable, Good-natured, Devoted, Lively, Playful",
"Swedish Vallhund,	Fearless, Friendly, Energetic, Alert, Intelligent",
"Thai Ridgeback,	Protective, Loyal, Independent, Intelligent, Loving",
"Tibetan Mastiff,	Strong Willed, Tenacious, Aloof, Stubborn",
"Tibetan Spaniel,	Willful, Aloof, Assertive, Independent, Playful",
"Tibetan Terrier,	Affectionate, Energetic, Amiable, Reserved, Gentle",
"Toy Fox Terrier,	Friendly, Spirited, Alert, Loyal, Playful",
"Treeing Walker Coonhound,	Clever, Affectionate, Confident, Intelligent",
"Vizsla	Affectionate, Energetic, Loyal, Gentle, Quiet",
"Weimaraner,	Steady, Aloof, Stubborn, Energetic, Alert",
"Welsh Springer Spaniel,	Stubborn, Friendly, Affectionate, Loyal, Playful",
"West Highland White Terrier,	Hardy, Friendly, Alert, Independent, Gay, Active",
"Whippet,	Friendly, Affectionate, Lively, Gentle, Intelligent",
"White Shepherd,	Self-confidence, Aloof, Fearless, Alert, Compassionate",
"Wire Fox Terrier,	Fearless, Friendly, Bold, Keen, Alert, Quick",
"Wirehaired Pointing Griffon,	Loyal, Gentle, Vigilant, Trainable, Proud",
"Xoloitzcuintli,	Cheerful, Alert, Companionable, Intelligent",
"Yorkshire Terrier,	Bold, Independent, Confident, Intelligent"
]

//Prepare one of the sample sentences by removing punctuation,
// creating an array of words and computing a random size attribute.
function getWords(i) {
  return words[i]
          .replace(/[!\.,:;\?]/g, '')
          .split(' ')
          .map(function(d) {
              return {text: d, size: 10 + Math.random() * 60};
          })
}

//This method tells the word cloud to redraw with a new set of words.
//In reality the new words would probably come from a server request,
// user input or some other source.
function showNewWords(vis, i) {
  i = i || 0;

  vis.update(getWords(i ++ % words.length))
  setTimeout(function() { showNewWords(vis, i + 1)}, 2000)
}

//Create a new instance of the word cloud visualisation.
var myWordCloud = wordCloud('body');

//Start cycling through the demo data
showNewWords(myWordCloud);