"use strict";

/* ---------- species data ---------- */
const R=(L,c,s)=>({t:'r',L,c,s:s||1});
const PEA=R([[[0],26,15,2,0,'o'],[[-62,62],17,9,2,0,'o']]);
const DAH={
 single:R([[8,30,9,4,0,'o']],{r:6}),
 anemone:R([[8,30,9,11,0,'o']],{r:10,tubes:1}),
 collerette:R([[8,32,9,12,0,'o'],[8,17,4.5,6,22,'p']],{r:5}),
 waterlily:R([[10,32,10,3,0,'o'],[9,26,10,3,20,'o'],[8,18,9,2,10,'o']]),
 decorative:R([[12,32,11,3,0,'o'],[11,26,11,3,14,'o'],[9,19,9,2,0,'o'],[7,12,7,1,20,'o']]),
 ball:R([[13,17,7,15,0,'o'],[11,14,6,9,15,'o'],[9,10,5,4,0,'o'],[6,6,4,0,20,'o']],null,1.15),
 pompon:R([[12,15,6.5,13,0,'o'],[9,11,5,7,15,'o'],[6,7,4,2,0,'o']],null,.8),
 cactus:R([[14,33,4.2,3,0,'p'],[12,28,3.8,3,13,'p'],[10,20,3.4,2,0,'p']]),
 semicactus:R([[12,33,6.5,3,0,'p'],[11,27,6,3,14,'p'],[9,19,5,2,0,'p']]),
 misc:R([[8,32,5,3,0,'l'],[8,27,8,3,22,'o']],{r:4})
};
const SPECIES=[
 /* wild */
 {id:'primrose',g:'wild',en:'Primrose',la:'Primula vulgaris',ga:'Sabhaircín',sp:R([[5,30,12,6,0,'n']],{r:4}),hint:'Márc.–máj., árnyékos árokpartok, sövények. Halványsárga, öt bevágott szirom, ráncos levélrózsa.'},
 {id:'daisy',g:'wild',en:'Daisy',la:'Bellis perennis',ga:'Nóinín',sp:R([[22,31,3.4,7,0,'l']],{r:8}),hint:'Egész évben, nyírt gyepen. Sárga korong körül fehér, gyakran rózsaszín hegyű szirmok.'},
 {id:'oxeye',g:'wild',en:'Oxeye daisy',la:'Leucanthemum vulgare',ga:'Nóinín mór',sp:R([[18,32,4.5,8,0,'l']],{r:9}),hint:'Máj.–aug., rétek, útszélek. A százszorszépnél jóval nagyobb, hosszú fehér szirmokkal.'},
 {id:'dandelion',g:'wild',en:'Dandelion',la:'Taraxacum officinale agg.',ga:'Caisearbhán',sp:R([[26,32,2.8,2,0,'l'],[18,24,2.8,2,10,'l']]),hint:'Márciustól ősz végéig. Levélrózsa, fogas levelek, sárga fészekvirág, később pelyhes bóbita.'},
 {id:'celandine',g:'wild',en:'Lesser celandine',la:'Ficaria verna',ga:'Grán arcáin',sp:R([[9,28,6,4,0,'p']],{r:4}),hint:'Márc.–máj., árnyékos partok. Fényes sárga csillag 8–12 szirommal, szív alakú levelek.'},
 {id:'marshmarigold',g:'wild',en:'Marsh-marigold',la:'Caltha palustris',ga:'Lus buí Bealtaine',sp:R([[5,31,14,3,0,'o']],{r:6}),hint:'Márc.–jún., vizes helyek. Nagy, fényes sárga virág, kerek, fényes levelek.'},
 {id:'woodanemone',g:'wild',en:'Wood anemone',la:'Anemone nemorosa',ga:'Lus na gaoithe',sp:R([[7,30,9,4,0,'o']],{r:5}),hint:'Márc.–máj., erdők. Fehér, olykor rózsás csillagvirág, tagolt levelek.'},
 {id:'garlicmustard',g:'wild',en:'Garlic mustard',la:'Alliaria petiolata',ga:'Bóchoinneal',sp:R([[4,26,11,5,45,'o']],{r:3}),hint:'Ápr.–jún., sövények. Apró fehér, négyszirmú virágok; a levél szétdörzsölve fokhagymaszagú.'},
 {id:'cuckooflower',g:'wild',en:'Cuckooflower',la:'Cardamine pratensis',ga:'',sp:R([[4,28,9,5,45,'o']],{r:3}),hint:'Ápr.–jún., nedves rétek. Halvány lilás-rózsaszín négyszirmú virágok.'},
 {id:'bluebell',g:'wild',en:'Bluebell',la:'Hyacinthoides non-scripta',ga:'Coinnle corra',sp:{t:'s',n:8,size:5.5,form:'bell',arch:1},hint:'Ápr.–máj., erdők. Egy oldalra hajló kék harangok, a szár ívben lehajlik.'},
 {id:'foxglove',g:'wild',en:'Foxglove',la:'Digitalis purpurea',ga:'Lus mór',sp:{t:'s',n:9,size:6,form:'bell'},hint:'Jún.–szept., sövények, erdőszélek. Magas virágzat, lehajló bíbor „gyűszűk”, belül pöttyös.'},
 {id:'ramsons',g:'wild',en:'Ramsons (wild garlic)',la:'Allium ursinum',ga:'Creamh',sp:{t:'u',rings:[[1,0],[6,13],[10,24]],dot:3.4,line:1},hint:'Ápr.–máj., nedves erdők. Fehér csillagok gömbös ernyőben, erős fokhagymaillat.'},
 {id:'yarrow',g:'wild',en:'Yarrow',la:'Achillea millefolium',ga:'Athair thalún',sp:{t:'u',rings:[[7,10],[12,20],[16,28]],dot:3,line:0},hint:'Jún.–szept., gyepek, útszélek. Lapos fehér ernyő, finoman szeldelt levelek.'},
 {id:'sneezewort',g:'wild',en:'Sneezewort',la:'Achillea ptarmica',ga:'Lus corráin',sp:{t:'u',rings:[[1,0],[6,12],[9,23]],dot:4.5,line:1},hint:'Júl.–szept., nedves rétek. Laza ernyőben kis fehér fészkek, keskeny, fogazott levelek.'},
 {id:'wildcarrot',g:'wild',en:'Wild carrot',la:'Daucus carota',ga:'Mealbhacán',sp:{t:'u',rings:[[1,0],[7,12],[12,23],[16,31]],dot:2.6,line:1},hint:'Jún.–aug., tengerparti gyepek, útszélek. Fehér ernyő, közepén gyakran egyetlen sötétvörös virág.'},
 {id:'bugle',g:'wild',en:'Bugle',la:'Ajuga reptans',ga:'Glasair choille',sp:{t:'s',n:7,size:4.6,form:'funnel'},hint:'Ápr.–jún., nedves rétek, erdőszélek. Kék ajakos virágok emeletesen a száron, fényes levelek.'},
 {id:'redclover',g:'wild',en:'Red clover',la:'Trifolium pratense',ga:'Seamair dhearg',sp:{t:'u',rings:[[1,0],[6,9],[10,17],[14,24]],dot:3.6,line:0},hint:'Máj.–szept., rétek. Rózsaszín-bíbor gömbös fejecske, a levélen világos V-alakú jel.'},
 {id:'yellowflag',g:'wild',en:'Yellow iris (yellow flag)',la:'Iris pseudacorus',ga:'Feileastram',sp:R([[3,32,13,3,0,'o'],[3,22,7,2,60,'p']]),hint:'Máj.–júl., mocsarak, árkok. Sárga nőszirom, kardalakú levelek.'},
 {id:'honeysuckle',g:'wild',en:'Honeysuckle',la:'Lonicera periclymenum',ga:'Féithleann',sp:R([[5,30,4.5,3,0,'l']],{r:3}),hint:'Jún.–szept., sövények. Krémsárga-rózsás, csöves, illatos virágok, kúszó szár.'},
 {id:'heather',g:'wild',en:'Heather (ling)',la:'Calluna vulgaris',ga:'Fraoch',sp:{t:'s',n:14,size:3.4,form:'dot'},hint:'Júl.–szept., lápok, hegyek. Apró rózsaszín-lila harangok sűrű füzérben.'},
 {id:'buttercup',g:'wild',en:'Meadow buttercup',la:'Ranunculus acris',ga:'',sp:R([[5,26,12,3,0,'o']],{r:4}),hint:'Máj.–szept., rétek. Fényes sárga, öt kerek szirom, magas, ágas szár.'},
 {id:'creepingbuttercup',g:'wild',en:'Creeping buttercup',la:'Ranunculus repens',ga:'',sp:R([[5,26,12,3,0,'o']],{r:4}),hint:'Máj.–szept., nedves gyepek, kertek. Fényes sárga, gyökerező indákkal terjed, foltos levelek.'},
 {id:'herbrobert',g:'wild',en:'Herb-Robert',la:'Geranium robertianum',ga:'',sp:R([[5,26,10,4,0,'o']],{r:3}),hint:'Máj.–szept., falak, sövények. Kis rózsaszín, öt szirmú virág; vöröses szár és levél.'},
 {id:'redcampion',g:'wild',en:'Red campion',la:'Silene dioica',ga:'',sp:R([[5,28,12,5,0,'n']],{r:3}),hint:'Ápr.–okt., sövények, erdőszélek. Rózsaszín, öt mélyen bevágott szirom, szőrös szár.'},
 {id:'seacampion',g:'wild',en:'Sea campion',la:'Silene uniflora',ga:'',sp:R([[5,28,12,5,0,'n']],{r:4}),hint:'Máj.–aug., tengerparti sziklák, kavicsos part. Fehér, bevágott szirmok, felfújt, hólyagos csésze.'},
 {id:'thrift',g:'wild',en:'Thrift (sea pink)',la:'Armeria maritima',ga:'',sp:{t:'u',rings:[[1,0],[6,7],[11,13],[15,19]],dot:3.2,line:0},hint:'Ápr.–aug., tengerparti sziklák, sós gyepek. Rózsaszín gömbös fejecske, pázsitszerű levélpárna.'},
 {id:'gorse',g:'wild',en:'Gorse',la:'Ulex europaeus',ga:'Aiteann gallda',sp:PEA,hint:'Egész évben, főleg tavasszal. Élénk sárga, borsóvirágszerű, kókuszillatú virág, tüskés bokor.'},
 {id:'birdsfoot',g:'wild',en:"Bird's-foot trefoil",la:'Lotus corniculatus',ga:'',sp:{t:'u',rings:[[1,0],[4,10]],dot:3.6,line:1},hint:'Máj.–szept., száraz gyepek, dűnék. Sárga, gyakran vöröses bimbójú virágok kis ernyőben.'},
 {id:'violet',g:'wild',en:'Common dog-violet',la:'Viola riviniana',ga:'',sp:R([[[-35,35],20,10,2,0,'o'],[[-100,100],18,9,2,0,'o'],[[180],20,10,2,0,'o']],{r:3}),hint:'Ápr.–máj., sövények, erdők. Kék-lila, szagtalan virág, világos sarkantyúval, szív alakú levelek.'},
 {id:'bramble',g:'wild',en:'Bramble (blackberry)',la:'Rubus fruticosus agg.',ga:'Dris',sp:R([[5,26,11,4,0,'o']],{r:5}),hint:'Máj.–szept., sövények. Fehér-rózsaszín, öt szirmú; tüskés szár; később feketeszeder.'},
 {id:'hawthorn',g:'wild',en:'Hawthorn',la:'Crataegus monogyna',ga:'Sceach gheal',sp:R([[5,24,10,4,0,'o']],{r:4}),hint:'Máj., sövények. Fehér, öt szirmú virágok csoportban, karéjos levelek, tüskés bokor.'},
 {id:'blackthorn',g:'wild',en:'Blackthorn',la:'Prunus spinosa',ga:'Draighean',sp:R([[5,24,10,4,0,'o']],{r:4}),hint:'Márc.–ápr., a levelek előtt virágzik. Fehér, öt szirmú virágok sötét, tüskés ágakon.'},
 {id:'elder',g:'wild',en:'Elder',la:'Sambucus nigra',ga:'Tromán',sp:{t:'u',rings:[[1,0],[7,10],[12,20],[16,28]],dot:2.8,line:1},hint:'Jún.–júl., sövények. Krémfehér, lapos, illatos ernyő; ősszel fekete bogyók.'},
 {id:'cowparsley',g:'wild',en:'Cow parsley',la:'Anthriscus sylvestris',ga:'',sp:{t:'u',rings:[[1,0],[7,12],[12,23],[16,31]],dot:2.4,line:1},hint:'Ápr.–jún., útszélek, sövények. Finom, fehér, habos ernyő, szeldelt levelek, üreges szár.'},
 {id:'hogweed',g:'wild',en:'Hogweed',la:'Heracleum sphondylium',ga:'',sp:{t:'u',rings:[[1,0],[8,12],[13,22],[17,30]],dot:3.2,line:1},hint:'Máj.–szept., útszélek. Nagy, lapos fehér ernyő, durva, szőrös szár. A nedve érzékeny bőrön irritálhat.'},
 {id:'meadowsweet',g:'wild',en:'Meadowsweet',la:'Filipendula ulmaria',ga:'',sp:{t:'u',rings:[[1,0],[6,8],[10,15],[13,22]],dot:3,line:0},hint:'Jún.–szept., nedves rétek, árkok. Krémfehér, habos, illatos virágzat, szeldelt levelek.'},
 {id:'loosestrife',g:'wild',en:'Purple-loosestrife',la:'Lythrum salicaria',ga:'',sp:{t:'s',n:12,size:3.8,form:'dot'},hint:'Jún.–aug., tavak, árkok partja. Magas, bíbor-rózsaszín virágfüzér.'},
 {id:'willowherb',g:'wild',en:'Rosebay willowherb',la:'Chamaenerion angustifolium',ga:'',sp:{t:'s',n:11,size:4,form:'dot'},hint:'Júl.–szept., parlagok, vasúti töltések. Magas rózsaszín virágfüzér, négy szirmú virágok.'},
 {id:'knapweed',g:'wild',en:'Common knapweed',la:'Centaurea nigra',ga:'',sp:R([[18,22,3,7,0,'l']],{r:9}),hint:'Jún.–szept., rétek. Bíbor, bojtos virágfej, sötét, fésűs murvákkal.'},
 {id:'scabious',g:'wild',en:"Devil's-bit scabious",la:'Succisa pratensis',ga:'',sp:{t:'u',rings:[[1,0],[6,8],[10,15],[13,21]],dot:3.6,line:0},hint:'Júl.–okt., nedves rétek, lápok. Kerek, kék-lila virágfej.'},
 {id:'harebell',g:'wild',en:'Harebell',la:'Campanula rotundifolia',ga:'',sp:{t:'s',n:4,size:6,form:'bell',arch:1},hint:'Júl.–szept., száraz gyepek, dűnék. Halványkék, lehajló harang, vékony, hajlékony szár.'},
 {id:'ragwort',g:'wild',en:'Common ragwort',la:'Jacobaea vulgaris',ga:'Buachalán buí',sp:R([[13,26,4,7,0,'l']],{r:8}),hint:'Júl.–okt., gyepek, útszélek. Sárga fészkek lapos bugában, szeldelt levelek. Mérgező a legelő állatoknak.'},
 {id:'selfheal',g:'wild',en:'Selfheal',la:'Prunella vulgaris',ga:'',sp:{t:'s',n:5,size:5,form:'dot'},hint:'Jún.–szept., gyepek. Lila ajakos virágok tömör, hengeres fejben.'},
 {id:'silverweed',g:'wild',en:'Silverweed',la:'Potentilla anserina',ga:'',sp:R([[5,26,11,3,0,'o']],{r:4}),hint:'Máj.–aug., nedves gyepek, partok. Sárga, öt szirmú virág, ezüstösen szőrös, szárnyas levelek.'},
 {id:'tormentil',g:'wild',en:'Tormentil',la:'Potentilla erecta',ga:'',sp:R([[4,26,11,4,45,'o']],{r:3}),hint:'Máj.–szept., lápok, gyepek. Apró sárga, négy szirmú virág.'},
 {id:'spearthistle',g:'wild',en:'Spear thistle',la:'Cirsium vulgare',ga:'Feochadán',sp:R([[22,24,2.4,8,0,'l']],{r:10}),hint:'Júl.–okt., legelők, parlagok. Bíbor, tüskés virágfej, tövises levelek.'},
 {id:'seaaster',g:'wild',en:'Sea aster',la:'Tripolium pannonicum',ga:'',sp:R([[18,28,3.5,6,0,'l']],{r:6}),hint:'Júl.–okt., sós mocsarak. Halvány lila szirmok sárga korong körül, húsos levelek.'},
 {id:'spottedorchid',g:'wild',en:'Common spotted-orchid',la:'Dactylorhiza fuchsii',ga:'',sp:{t:'s',n:10,size:4,form:'funnel'},hint:'Jún.–júl., rétek, dűnék. Rózsaszín-lila virágkúp, foltos levelek.'},
 {id:'earlypurple',g:'wild',en:'Early-purple orchid',la:'Orchis mascula',ga:'',sp:{t:'s',n:9,size:4,form:'funnel'},hint:'Ápr.–jún., erdők, sövények. Bíbor virágkúp, sötét foltos levelek.'},
 {id:'bellheather',g:'wild',en:'Bell heather',la:'Erica cinerea',ga:'',sp:{t:'s',n:10,size:3.6,form:'bell'},hint:'Júl.–szept., száraz lápok. Sötét bíbor, harang alakú virágok, vékony levelek.'},
 {id:'stjohnswort',g:'wild',en:"Perforate St John's-wort",la:'Hypericum perforatum',ga:'',sp:R([[5,26,9,3,0,'o']],{r:7}),hint:'Jún.–szept., gyepek, szegélyek. Sárga, öt szirmú virág, hosszú porzócsomó, a levélben átlátszó pontok.'},
 {id:'vetchling',g:'wild',en:'Meadow vetchling',la:'Lathyrus pratensis',ga:'',sp:PEA,hint:'Jún.–aug., rétek. Sárga borsóvirágok fürtben, kacsos szár.'},
 {id:'poppy',g:'wild',en:'Common poppy',la:'Papaver rhoeas',ga:'Poipín dearg',sp:R([[4,28,16,3,45,'o']],{r:5}),hint:'Jún.–aug., szántók, parlagok. Skarlátvörös, vékony szirmú virág.'},
 {id:'bittersweet',g:'wild',en:'Bittersweet',la:'Solanum dulcamara',ga:'',sp:R([[5,26,6,2,0,'p']],{r:6}),hint:'Jún.–szept., sövények, vizek mellett. Lila, hátrahajló szirmok, sárga porzókúp; piros bogyók. Mérgező.'},
 {id:'waterlily',g:'wild',en:'White water-lily',la:'Nymphaea alba',ga:'Duilleog bháite bhán',sp:R([[12,30,7,3,0,'p'],[10,22,6,2,15,'p']],{r:5}),hint:'Jún.–aug., tavak. Nagy fehér, sok szirmú virág a víz színén, kerek, úszó levelek.'},
 /* dahlia forms */
 {id:'d_single',g:'dahlia',en:'Dahlia: Single',la:'Dahlia',ga:'',sp:DAH.single,hint:'Egy sor lapos sziromlevél, a közepén jól látható korong.'},
 {id:'d_anemone',g:'dahlia',en:'Dahlia: Anemone',la:'Dahlia',ga:'',sp:DAH.anemone,hint:'Egy sor szirom, a közepén párnaszerűen emelkedő csöves virágok.'},
 {id:'d_collerette',g:'dahlia',en:'Dahlia: Collerette',la:'Dahlia',ga:'',sp:DAH.collerette,hint:'Külső szirmok, a korong körül kisebb „gallér” szirmokkal, gyakran más színben.'},
 {id:'d_waterlily',g:'dahlia',en:'Dahlia: Waterlily',la:'Dahlia',ga:'',sp:DAH.waterlily,hint:'Széles, lapos, sekély virág, vízililiomra hasonlít, a szirmok kitárulnak.'},
 {id:'d_decorative',g:'dahlia',en:'Dahlia: Decorative',la:'Dahlia',ga:'',sp:DAH.decorative,hint:'Telt virág, széles, lapos szirmok, nem látszik a korong.'},
 {id:'d_ball',g:'dahlia',en:'Dahlia: Ball',la:'Dahlia',ga:'',sp:DAH.ball,hint:'Gömb alakú, a szirmok csőszerűen begöngyölődnek. A pompon ennél kisebb, kb. 5 cm alatti.'},
 {id:'d_pompon',g:'dahlia',en:'Dahlia: Pompon',la:'Dahlia',ga:'',sp:DAH.pompon,hint:'Kicsi, szoros gömb, szabályosan begöngyölt szirmok.'},
 {id:'d_cactus',g:'dahlia',en:'Dahlia: Cactus',la:'Dahlia',ga:'',sp:DAH.cactus,hint:'Hosszú, hegyes szirmok, a szélük nagyrészt hosszában begöngyölt, tüskés összkép.'},
 {id:'d_semicactus',g:'dahlia',en:'Dahlia: Semi-cactus',la:'Dahlia',ga:'',sp:DAH.semicactus,hint:'Mint a kaktusz, de a szirmok töve széles, és csak a felük begöngyölt.'},
 {id:'d_misc',g:'dahlia',en:'Dahlia: Orchid / other',la:'Dahlia',ga:'',sp:DAH.misc,hint:'Különleges forma, például orchidea típus: hosszú, hátrahajló vagy csőszerű szirmok.'},
 /* other garden */
 {id:'fuchsia',g:'garden',en:'Fuchsia',la:'Fuchsia magellanica',ga:'Deora Dé',sp:{t:'f'},hint:'Jún.–okt., sövényként főleg nyugaton. Lelógó piros-lila „lámpások”.'},
 {id:'montbretia',g:'garden',en:'Montbretia',la:'Crocosmia × crocosmiiflora',ga:'',sp:{t:'s',n:7,size:5,form:'funnel',arch:1},hint:'Júl.–szept., árokpartok, kertek. Narancsvörös tölcsérek ívelt száron, kardlevelek.'},
 {id:'hydrangea',g:'garden',en:'Hydrangea',la:'Hydrangea macrophylla',ga:'',sp:{t:'u',rings:[[1,0],[6,9],[11,17],[16,25],[20,32]],dot:4.3,line:0},hint:'Júl.–okt., nagy gömbös virágzat. A szín (kék/rózsaszín) a talaj kémhatásától függ.'},
 {id:'rose',g:'garden',en:'Rose',la:'Rosa',ga:'',sp:R([[7,30,14,2,0,'o'],[6,24,12,2,25,'o'],[5,18,10,2,10,'o'],[4,12,8,1,40,'o'],[3,7,5,0,0,'o']]),hint:'Spirálisan rétegzett szirmok, tüskés szár, fogas összetett levelek.'},
 {id:'sweetpea',g:'garden',en:'Sweet pea',la:'Lathyrus odoratus',ga:'',sp:PEA,hint:'Jún.–szept., illatos pillangós virág, kacsos kúszó szár.'},
 {id:'sunflower',g:'garden',en:'Sunflower',la:'Helianthus annuus',ga:'',sp:R([[24,30,5,10,0,'p']],{r:12}),hint:'Júl.–okt., nagy sárga fészek, hatalmas barna korong, magas szár.'},
 {id:'hebe',g:'garden',en:'Hebe',la:'Hebe',ga:'',sp:{t:'s',n:9,size:4,form:'dot'},hint:'Jún.–okt., örökzöld cserje, főleg a part mentén. Sűrű füzér, fehér, kék vagy lila.'},
 {id:'camellia',g:'garden',en:'Camellia',la:'Camellia japonica',ga:'',sp:R([[7,28,13,3,0,'o'],[6,22,11,3,25,'o'],[5,15,8,2,10,'o']],{r:4}),hint:'Febr.–ápr., fényes örökzöld levelek, egyszerű vagy rózsaszerű virág.'},
 {id:'cosmos',g:'garden',en:'Cosmos',la:'Cosmos bipinnatus',ga:'',sp:R([[8,30,11,4,0,'n']],{r:5}),hint:'Júl.–okt., nyolc széles, a szélén fogas szirom, finom, tűszerű levelek.'}
];
const GROUPS={wild:'Írországi vadvirágok',dahlia:'Dália típusok',garden:'Más kerti virágok'};
const TAB_GROUPS={wild:['wild'],garden:['dahlia','garden']};
const GEN=R([[7,30,10,5,0,'o']],{r:5});

/* ---------- silhouette drawing ---------- */
const CX=50,CY=44;
function petal(shape,len,w){
  const f=n=>n.toFixed(1);
  if(shape==='p')return `M0,0 C${f(-w)},${f(-len*.3)} ${f(-w*.6)},${f(-len*.75)} 0,${f(-len)} C${f(w*.6)},${f(-len*.75)} ${f(w)},${f(-len*.3)} 0,0Z`;
  if(shape==='n')return `M0,0 C${f(-w)},${f(-len*.1)} ${f(-w*1.2)},${f(-len*.9)} ${f(-w*.3)},${f(-len*.98)} L0,${f(-len*.84)} L${f(w*.3)},${f(-len*.98)} C${f(w*1.2)},${f(-len*.9)} ${f(w)},${f(-len*.1)} 0,0Z`;
  return `M0,0 C${f(-w)},${f(-len*.15)} ${f(-w*1.15)},${f(-len*.85)} 0,${f(-len)} C${f(w*1.15)},${f(-len*.85)} ${f(w)},${f(-len*.15)} 0,0Z`;
}
function stemLeaves(){return `<path class="stem" d="M50,46 C50,70 47,84 49,99"/><path class="leaf" d="M49,84 C38,80 32,86 28,92 C38,95 46,92 49,84Z"/><path class="leaf" d="M49,76 C60,70 68,74 72,80 C62,84 53,82 49,76Z"/>`}
function drawRadial(sp){
  let o=`<g transform="translate(${CX} ${CY}) scale(${sp.s})">`;
  for(const [n,len,w,off,rot,shape] of sp.L){
    const ang=Array.isArray(n)?n:Array.from({length:n},(_,i)=>i*360/n+rot);
    const d=petal(shape,len,w);
    for(const a of ang)o+=`<path transform="rotate(${a.toFixed(1)}) translate(0 ${-off})" d="${d}"/>`;
  }
  if(sp.c){
    if(sp.c.tubes){for(let i=0;i<9;i++){const a=i*40*Math.PI/180;o+=`<circle class="core" cx="${(Math.cos(a)*6).toFixed(1)}" cy="${(Math.sin(a)*6).toFixed(1)}" r="3"/>`}}
    o+=`<circle class="core" r="${sp.c.tubes?4.5:sp.c.r}"/>`;
  }
  return o+'</g>';
}
function drawUmbel(sp){
  let o=`<g transform="translate(${CX} ${CY-4})">`;
  for(const [n,r] of sp.rings)for(let i=0;i<n;i++){
    const a=(i/n)*2*Math.PI+r*0.37,x=Math.cos(a)*r,y=Math.sin(a)*r*.85;
    if(sp.line&&r)o+=`<path class="thin" d="M0,0 L${x.toFixed(1)},${y.toFixed(1)}"/>`;
    o+=`<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${sp.dot}"/>`;
  }
  return o+'</g>';
}
function drawSpike(sp){
  let o='',pts=[];
  const bez=t=>{const p=[[50,98],[50,50],[54,16],[78,22]];const m=1-t;return[m*m*m*p[0][0]+3*m*m*t*p[1][0]+3*m*t*t*p[2][0]+t*t*t*p[3][0],m*m*m*p[0][1]+3*m*m*t*p[1][1]+3*m*t*t*p[2][1]+t*t*t*p[3][1]]};
  for(let i=0;i<sp.n;i++){const t=.2+.8*i/(sp.n-1);pts.push(sp.arch?bez(t):[50,90-t*80+8])}
  o+=sp.arch?`<path class="stem" d="M50,98 C50,50 54,16 78,22"/>`:`<path class="stem" d="M50,98 L50,8"/>`;
  pts.forEach(([x,y],i)=>{
    const t=i/(sp.n-1),s=sp.size*(1-.4*t),side=sp.arch?1:(i%2?1:-1);
    if(sp.form==='bell')o+=`<ellipse cx="${(x+side*s*.9).toFixed(1)}" cy="${(y+s*.9).toFixed(1)}" rx="${(s*.75).toFixed(1)}" ry="${(s*1.15).toFixed(1)}" transform="rotate(${side*-18} ${x.toFixed(1)} ${y.toFixed(1)})"/>`;
    else if(sp.form==='funnel')o+=`<ellipse cx="${(x+side*s*.9).toFixed(1)}" cy="${y.toFixed(1)}" rx="${(s*1.1).toFixed(1)}" ry="${(s*.65).toFixed(1)}" transform="rotate(${side*-28} ${x.toFixed(1)} ${y.toFixed(1)})"/>`;
    else o+=`<circle cx="${(x+side*2).toFixed(1)}" cy="${y.toFixed(1)}" r="${(s*.62).toFixed(1)}"/>`;
  });
  return o+`<path class="leaf" d="M49,92 C38,86 32,92 28,98 C38,100 46,98 49,92Z"/>`;
}
function drawFuchsia(){
  return `<path class="stem" d="M20,14 C40,8 62,12 62,30"/><path class="leaf" d="M32,12 C28,22 22,24 18,24 C20,16 26,12 32,12Z"/>
  <path d="M62,30 L40,26 M62,30 L44,46 M62,30 L82,26 M62,30 L80,46" class="stem"/>
  <path d="M62,30 C50,36 50,56 62,66 C74,56 74,36 62,30Z"/><path d="M62,52 C54,56 52,66 56,72 C60,68 64,68 68,72 C72,66 70,56 62,52Z"/>
  <path class="stem" d="M62,60 L60,80 M62,60 L64,82"/>`;
}
function silhouette(sp){
  const body=sp.t==='r'?drawRadial(sp):sp.t==='u'?drawUmbel(sp):sp.t==='s'?drawSpike(sp):drawFuchsia();
  const base=(sp.t==='r'||sp.t==='u')?stemLeaves():'';
  return `<svg class="sil" viewBox="0 0 100 100" role="img" aria-hidden="true">${base}${body}</svg>`;
}
