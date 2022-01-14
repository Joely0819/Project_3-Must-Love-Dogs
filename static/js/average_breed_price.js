

var mybarChart = d3.select("#trybar");
let title = `Average Puppy Price for ALL Breeds`

let breeds =["Affenpinscher", "Afghan Hound","Airedale Terrier","Akita","Alaskan Malamute","American Bulldog","American Eskimo Dog","American Staffordshire Terrier",
    	"American Water Spaniel","Australian Kelpie","Australian Shepherd","Australian Terrier","Basenji","Basset Hound","Beagle","Bearded Collie",
    	"Beauceron","Bedlington Terrier","Bernese Mountain Dog","Bichon Frise","Black and Tan Coonhound","Bloodhound","Bluetick Coonhound","Boerboel",
    	"Border Collie","Border Terrier","Boston Terrier","Boxer","Boykin Spaniel","Briard","Bull Terrier","Bullmastiff","Cairn Terrier","Catahoula Leopard Dog",
    	"Cavalier King Charles Spaniel","Chesapeake Bay Retriever","Chinook","Chow Chow","Clumber Spaniel","Cocker Spaniel","Coton de Tulear",
    	"Dalmatian","Doberman Pinscher","Dutch Shepherd","English Setter","English Shepherd","English Springer Spaniel",
    	"English Toy Spaniel","Field Spaniel","Finnish Lapphund","Finnish Spitz","French Bulldog","German Pinscher","German Shepherd Dog","German Shorthaired Pointer",
    	"Giant Schnauzer","Giant Schnauzer","Glen of Imaal Terrier","Golden Retriever","Gordon Setter","Great Dane","Great Pyrenees","Greyhoun","Harrier",
    	"Havanese","Irish Setter","Irish Terrier","Irish Wolfhound","Italian Greyhound","Japanese Chin","Keeshond","Komondor","Kuvasz",
    	"Labrador Retriever","Lancashire Heeler","Leonberger","Lhasa Apso","Maltese","Miniature Pinscher","Miniature Schnauzer","Norfolk Terrier",
    	"Norwich Terrier","Old English Sheepdog","Papillon","Pekingese","Pharaoh Hound","Pomeranian","Pug","Puli","Pumi","Rat Terrier","Redbone Coonhound",
    	"Rhodesian Ridgeback","Rottweiler","Saint Bernard","Saluki","Samoyed","Schipperke","Scottish Deerhound","Shiba Inu","Shih Tzu",
    	"Siberian Husky","Silky Terrier","Smooth Fox Terrier","Staffordshire Bull Terrier","Swedish Vallhund","Thai Ridgeback","Tibetan Mastiff","Tibetan Spaniel",
    	"Tibetan Terrier","Toy Fox Terrier","Treeing Walker Coonhound","Vizsla","Weimaraner","Welsh Springer Spaniel","Whippet","Wire Fox Terrier"]

let avgprice = [
    1000.0,2250.0,700.0,1000.0,1350.0,800.0,700.0,900.0,900.0,600.0,700.0,1250.0,1100.0,400.0,
    650.0,1300.0,1350.0,1900.0,900.0,850.0,350.0,1000.0,550.0,1750.0,700.0,1300.0,750.0,900.0,900.0,1100.0,
    1350.0,1350.0,850.0,400.0,1350.0,800.0,900.0,700.0,1000.0,700.0,2700.0,800.0,900.0,1100.0,500.0,900.0,750.0,
    1400.0,900.0,700.0,600.0,3000.0,1500.0,1400.0,700.0,1250.0,1250.0,900.0,1500.0,900.0,1000.0,800.0,650.0,350.0,
    1050.0,900.0,700.0,1900.0,900.0,400.0,900.0,1000.0,1350.0,1500.0,700.0,1750.0,600.0,700.0,500.0,800.0,2250.0,1700.0,
    1350.0,500.0,700.0,1900.0,700.0,400.0,1100.0,2750.0,400.0,700.0,1150.0,1600.0,1650.0,700.0,1350.0,800.0,1100.0,900.0,
    1000.0,950.0,700.0,850.0,1750.0,800.0,700.0,3000.0,900.0,1600.0,500.0,500.0,1000.0,1750.0,
    1300.0,1000.0,900.0
    ]

let trace1 = {
    x: breeds,
    y: avgprice,
    type: 'bar',
    marker: {color: 'rgb(64, 79, 54)'}
};

let data = [trace1];

let layout = {
  title: title,
  height: 650,
  width: 1025,
  font: {family: 'Quicksand', size:10},hoverlabel: {font: {family: 'Quicksand'}}

};

Plotly.newPlot("trybar", data, layout);