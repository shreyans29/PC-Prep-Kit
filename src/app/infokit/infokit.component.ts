import { Component, OnInit } from '@angular/core';
import { InfokitService } from '../services/infokit.service';

@Component({
    selector: 'app-infokit',
    templateUrl: './infokit.component.html',
    styleUrls: ['./infokit.component.scss']
})
export class InfokitComponent implements OnInit {
    private static _localStorageKey = 'pcprepkitUser';
    // sets infokit visible/Invisible Default : Invisible
    public infokitState = false;
    public infokitAvailable = false;
    /**
     * sets the Infokit Information to visible/Invisible Default : Invisible.
     * When Infokit Information is Invisible the Infokit Selector is Visible and Vice Versa.
     */
    public showInfo = false;
    // sets the visiblility of the Icons in Infokit Selector
    public infokitActive = [
        {key: 'malaria_def', value: false, def: 'Malaria', img: 'malaria.png', content: 'An intermittent and remittent fever caused by a protozoan parasite that invades the red blood cells. The parasite is transmitted by mosquitoes in many tropical and subtropical regions.'},
        {key: 'pc_policy', value: false, def: 'Peace Corps Policy', img: 'pcpolicy.png', content: 'This contains Peace Corps Policy'},
        {key: 'animation', value: false, def: 'Animation', img: 'lifecycle.png', content: 'The malaria parasite life cycle involves two hosts. During a blood meal, a malaria-infected female Anopheles mosquito inoculates sporozoites into the human host . Sporozoites infect liver cells and mature into schizonts , which rupture and release merozoites . (Of note, in P. vivax and P. ovale a dormant stage [hypnozoites] can persist in the liver and cause relapses by invading the bloodstream weeks, or even years later.) After this initial replication in the liver (exo-erythrocytic schizogony ), the parasites undergo asexual multiplication in the erythrocytes (erythrocytic schizogony ). Merozoites infect red blood cells . The ring stage trophozoites mature into schizonts, which rupture releasing merozoites . Some parasites differentiate into sexual erythrocytic stages (gametocytes) . Blood stage parasites are responsible for the clinical manifestations of the disease.'},
        {key: 'do_dont', value: false, def: 'Do\'s and Don\'ts', img: 'dodont.png', content: 'Dos: <br> Contaminated water around should be disposed. <br> Use Mosquito repellent. <br> Body Should be covered as much as possible <br> <br> Don\'ts: <br> Don\'t keep unscreened doors and windows open. <br> Don\'t play outside in shorts and half/without sleeves clothes'},
        {key: 'odd_one_out', value: false, def: 'Odd One Out', img: 'malariainfo.png', content: 'Citronella can replel mosquitos. <br> Malaria is transmitted through mosquito bites. <br> Malaria is transmitted by a mosquito but parasite causes the disease.'},
        {key: 'match_meds', value: false, def: 'Match the Meds', img: 'meds.png', content: 'Mefloquine can be used to treat mild or moderate malaria but should not be used to treat severe malaria. <br> Doxycycline is an antibiotic that fights bacteria in the body <br> Malarone works by interfering with the growth of parasites in the red blood cells of the human body. '  },
        {key: 'side_effects', value: false, def: 'Side Effects', img: 'sideeffects.png', content: 'Mefloquine, taken every week, may cause upset stomach, dizziness, nausea, headache,vivd dreams, neuropsychiatric side effects. <br> Malarone taken once every day, may cause nausea, vomiting, stomach pain, headache, diarrhea. <br> Doxycycline is an antibiotic which when taken every day, may cause sensitivity to sunlight , and upset stomach. '},
        {key: 'doctor_info', value: false, def: 'Doctor Information', img: 'doctor.png', content: 'Consult a doctor before you take any medication. Wrong medication can prove to be fatal.'}
    ];
    // Sets the Heading In Infokit Pop Up
    public heading = 'Info Kit';
    // Sets the Content In Infokit Pop Up
    public infoContent = 'loading...';

    constructor(private _infokitService: InfokitService) { }

    /**
     * Get data from Infokit API
     */
    ngOnInit() {
        this.getData();
    }

    /**
     * Update the Infokit Information from the APIs. set Infokit to Visible from Invisible and vice Versa
     * Reset the Headings and Content
     */
    pop() {
        this.getData();
        this.showInfo = false;
        this.heading = 'Info Kit';
        this.infoContent = 'loading...';
        this.infokitState = !this.infokitState;
    }
    /**
     * Updates Information to be displayed by Infokit Popup and Sets Information to Visible
     * @param  {String} activity Provies Information about the section selected in Infokit Selector
     */

    info(activity, description) {
        this.heading = activity;
        this.showInfo = true;
        this.infoContent = description;
    }

    /**
     * Gets Infromation from the Infokit API
     */
    getData() {
      if (localStorage.getItem(InfokitComponent._localStorageKey)) {
          this._infokitService.infokitactive().subscribe(response => {
              for (let info of this.infokitActive) {
                  console.log(response);
                  info.value = response.infokitactive[info.key];
              }

              for (let info of this.infokitActive) {
                  if (info.value) {
                      this.infokitAvailable = true;
                      break;
                  }
              }
          });
      }
    }
}
