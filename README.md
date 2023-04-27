# Vue.JS Recruitment test

### Tapşırıq 1

Tapşırıq Vue-cli 3 əsasında default forma ilə hazırlanmalıdır. (Əgər tapşırığı Reactjs ilə hazırlamaq istəsəniz, göstərilən mərhələlərin react ekvivalentləri ilə tapşırığı yerinə yetirə bilərsiniz. Sonda isə repozitoriyanı public formada bizə göndərin)

Tapşırıq hazırlanan zaman minimal olaraq aşağıdakı alətlərdən istifadə edilməlidir. 

- VueRouter
- Vuex
- SCSS və sair CSS pre-processor 
- Tələb olunan zaman faylların yüklənməsi və s. funskionallıqlar 

### Tapşırıq 2
Şəkillər demo məqsədlə göstərilmişdir. Tapşırığı hazırlayan zaman şəxsi dizayn prinsiplərinizdən istifadə edin. 
Restoranın sifarişlərini idarə edə bilməsi üçün sadə formada admin panel hazırlayın. 
1. Ana səhifədə şirkət haqqında ümumi məlumat olan informativ giriş səhifəsi, neçə sifariş olduğu və faktiki gün ərzində sonlandırılan sifarişlərin cəmi gəlirləri hər hansı formada səliqəli göstərilməlidir.

2. Daxil olan yemək sifarişləri barədə ümumi məlumat almaq üçün formanı hazırlayın. 
    * Formada bütün sifarişlər ən son daxil olan sifarişdən geriyə sıralanaraq göstərilməlidir. 
    * Sifariş məlumatları : Sıra sayı (S/S), Masa, Xidmətçi, Status, Məbləğ, Sonlanma Tarixi, Ətraflı.
    * Statuslara görə sifarişləri ayırd etmək mümkün olsun. 1. Sonlanmayan 2. Sonlanan. 3. Ləğv edilən. (istəyinizə görə əlavə statuslar da tətbiq edə bilərsiniz) . 
    * Sifarişlər listində ən birinci sonlanmayan sifarişlər olmalıdır. Ondan sonra digər statusda olan sifarişlər tarix ardıcıllığına görə göstərilməlidir. 

3. Sifariş daxilində olan məlumatlara (yeməklər, qiymət və s.) ətraflı baxmaq üçün forma tətbiq edin. 


![first](https://user-images.githubusercontent.com/3234413/70997765-2cda5480-20ef-11ea-9141-16bdb6c14ac7.png)

### Tapşırıq 3
Sifarişin yaradılması üçün formanı hazırlayın. 
Yaradılma prosesi.

* Sifarişin aid olduğu  masanı seçin
* Xidmət edəcək şəxsi seçin 
* Sifariş yarat düyməsini basaraq sifarişi başladın.

Sifariş yarandıqdan sonra müştərinin istədiyi yeməkləri siyahıdan seçərək sifarişə əlavə edin.

Əlavə edilmə prosesində yemək adı və neçə ədəd olması göstərilməlidir. Qiymət avtomatik olaraq saya uyğun olaraq hesablanmalıdır. 

![](https://user-images.githubusercontent.com/3234413/70997839-53988b00-20ef-11ea-9675-e45e18ebca1e.png)

Sifarişə artırılan bütün yeməklər avtomatik olaraq sifariş tərkibində olan yeməkləri göstərən siyahıya düşməlidir və alt tərəfdə sifariş tərkibində olan bütün yeməklərin cəmi məbləği dinamik olaraq hesablanmalıdır. 

Yeməklərdən hər hansının ləğvi zamanı onun silinməsi funksionallığını təmin edin. Eyni zamanda sifarişdə olan yeməyin müştəriyə çatdığını və ya ləğv olunduğunu bildirmək üçün də statuslardan istifadə edə bilərsiniz.
 
Sifariş daxilində heç bir yemək olmadan sonlandırıla bilməz. Ancaq ləğv edilə bilər. Bunun üçün yoxlama tətbiq edin. 

![](https://user-images.githubusercontent.com/3234413/70997709-17fdc100-20ef-11ea-88ab-3594c67192b6.png)

Dataların API-dən qəbul ediləcəyini nümayiş etmək üçün ayrıca bir qovluqda .json formada demo məlumatları hazırlayın. Bundan sonra ajax (hər hansı library istifadə edə bilərsiniz) sorğular ilə mövcud məlumatları həmin json fayllarından əldə edin. Bu sizin REST API ilə işləmə bacarıqlarınızı yoxlamaq üçündür. 

Requestlərin asinxron olduğunu nəzərə alaraq lazım olan yerlərdə məlumatların API-dən gələnədək gözlənilməsini təmin edin. Eyni zamanda request error handling tətbiq edin.

Tapşırığı hazırlayan zaman API servislərin, Class-ların, view-ların və komponent-lərin məntiqi strukturda ayrıca qovluqlarda olmasına diqqət etməniz və eyni zamanda mümkün validasiyaları tətbiq etməniz tövsiyə olunur. 
