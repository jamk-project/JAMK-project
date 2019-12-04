// From VisTimeline.js
let oldcampaigns = false;
// From App.js  (React app)
let finalcampaigns = {};
// ______________________________________________________________________________________________________
(fetchCampaignData = () => {
  // data fetching from db through api
  fetch("https://test-frontend0412.azurewebsites.net/api/campaigns")
    // fetch("http://localhost:3000/api/campaigns")
    .then(response => response.json())
    .then(response => {
      console.log('[campaigns]: ', response)
      // Google campaigns to arrays inside finalcampaigns object
      finalcampaigns.google = response.map(campaign => {
        if (campaign.datasource === "googleads" && campaign.client_id === 1) {
          return Object.values(campaign);
        } else return null;
      });
      // Filter null values (other than google campaigns)
      finalcampaigns.google = finalcampaigns.google.filter(
        campaign => campaign !== null
      );

      // Facebook campaigns to arrays inside finalcampaigns object
      finalcampaigns.facebook = response.map(campaign => {
        if (campaign.datasource === "facebookads" && campaign.client_id === 1) {
          return Object.values(campaign);
        } else return null;
      });
      // Filter null values (other than fb campaigns)
      finalcampaigns.facebook = finalcampaigns.facebook.filter(
        campaign => campaign !== null
      );

      // LinkedIn campaigns to arrays inside finalcampaigns object
      finalcampaigns.linkedin = response.map(campaign => {
        if (campaign.datasource === "linkedinads" && campaign.client_id === 1) {
          return Object.values(campaign);
        } else return null;
      });
      // Filter null values (other than li campaigns)
      finalcampaigns.linkedin = finalcampaigns.linkedin.filter(
        campaign => campaign !== null
      );

      // Clients own notes to arrays inside finalcampaigns object
      finalcampaigns.notes = response.map(campaign => {
        if (campaign.datasource === "note" && campaign.client_id === 1) {
          return Object.values(campaign);
        } else return null;
      });
      // Filter null values (other than notes)
      finalcampaigns.notes = finalcampaigns.notes.filter(
        campaign => campaign !== null
      );

      fetch("https://test-frontend0412.azurewebsites.net/api/ads")
        // fetch("http://localhost:3000/api/ads")
        .then(response => response.json())
        .then(response => {
          console.log('[ads]: ', response)
          // Google ads to arrays inside finalcampaigns object
          finalcampaigns.googleAdData = response.map(ad => {
            if (ad.datasource === "googleads" && ad.client_id === 1) {
              return Object.values(ad);
            } else return null;
          });
          // Filter null values (other than google ads)
          finalcampaigns.googleAdData = finalcampaigns.googleAdData.filter(
            ad => ad !== null
          );
          // Facebook ads to arrays inside finalcampaigns object
          finalcampaigns.facebookAdData = response.map(ad => {
            if (ad.datasource === "facebookads" && ad.client_id === 1) {
              return Object.values(ad);
            } else return null;
          });
          // Filter null values (other than fb ads)
          finalcampaigns.facebookAdData = finalcampaigns.facebookAdData.filter(
            ad => ad !== null
          );

          // this.handleCampaignData(finalcampaigns);
          console.log('[finalcampaigns]: ', finalcampaigns)
          handleCampaignData(finalcampaigns);
        });
    });
})();

handleCampaignData = campaignData => {
  document.getElementById("timeline").innerHTML = "";
  // From CampaignTimeline index.js
  let gcampaigns = campaignData.google.map(campaign => {
    if (campaign[6] === " --" && campaign[4] === "paused") {
      return {
        group: 0,
        id: campaign[0],
        status: campaign[4],
        start: new Date(campaign[5]),
        content: campaign[3],
        title:
          '<b style="font-size: 0.75em">' +
          campaign[3] +
          "</b>" +
          "<br>" +
          campaign[5] +
          " - Ei määritettyä päättymisaikaa", //title = Tooltipin sisältö
        className: "paused"
      };
    } else if (campaign[4] === "paused")
      return {
        group: 0,
        id: campaign[0],
        status: campaign[4],
        start: new Date(campaign[5]),
        end: new Date(campaign[6]),
        content: campaign[3],
        className: "paused",
        title:
          '<b style="font-size: 0.75em">' +
          campaign[3] +
          "</b>" +
          "<br>" +
          campaign[5] +
          " - " +
          campaign[6]
      };
    else if (campaign[6] === " --" || campaign[6] === "")
      return {
        group: 0,
        id: campaign[0],
        status: campaign[4],
        start: new Date(campaign[5]),
        end: new Date(),
        content: campaign[3],
        title:
          '<b style="font-size: 0.75em">' +
          campaign[3] +
          "</b>" +
          "<br>" +
          campaign[5] +
          " - Ei määritettyä päättymisaikaa", //title = Tooltipin sisältö,
        className: "activeg"
      };
    else
      return {
        group: 0,
        id: campaign[0],
        status: campaign[4],
        start: new Date(campaign[5]),
        end: new Date(campaign[6]),
        content: campaign[3],
        title:
          '<b style="font-size: 0.75em">' +
          campaign[0] +
          "</b>" +
          "<br>" +
          campaign[3] +
          " - " +
          campaign[4],
        className: "activeg"
      };
  });

  let fbcampaigns = campaignData.facebook.map(campaign => {
    if (campaign[6] === undefined && campaign[4] !== "ACTIVE") {
      return {
        group: 1,
        id: campaign[0],
        status: campaign[4],
        start: new Date(campaign[5]),
        content: campaign[3],
        title:
          '<b style="font-size: 0.75em">' +
          campaign[3] +
          "</b>" +
          "<br>" +
          campaign[5] +
          " - Ei määritettyä päättymisaikaa", //title = Tooltipin sisältö
        className: "paused"
      };
    } else if (campaign[4] !== "ACTIVE")
      return {
        group: 1,
        id: campaign[0],
        status: campaign[4],
        start: new Date(campaign[5]),
        end: new Date(campaign[6]),
        content: campaign[3],
        className: "paused",
        title:
          '<b style="font-size: 0.75em">' +
          campaign[3] +
          "</b>" +
          "<br>" +
          campaign[5] +
          " - " +
          campaign[6]
      };
    else if (campaign[6] === undefined || campaign[6] === "")
      return {
        group: 1,
        id: campaign[0],
        status: campaign[4],
        start: new Date(campaign[5]),
        end: new Date(),
        content: campaign[3],
        title:
          '<b style="font-size: 0.75em">' +
          campaign[3] +
          "</b>" +
          "<br>" +
          campaign[5] +
          " - Ei määritettyä päättymisaikaa", //title = Tooltipin sisältö
        className: "active"
      };
    else
      return {
        group: 1,
        id: campaign[0],
        status: campaign[4],
        start: new Date(campaign[5]),
        end: new Date(campaign[6]),
        content: campaign[3],
        title:
          '<b style="font-size: 0.75em">' +
          campaign[3] +
          "</b>" +
          "<br>" +
          campaign[5] +
          " - " +
          campaign[6],
        className: "active"
      };
  });

  let licampaigns = campaignData.linkedin.map(campaign => {
    if (campaign[6] === undefined && campaign[4] !== "ACTIVE") {
      return {
        group: 2,
        id: campaign[0],
        status: campaign[4],
        start: new Date(campaign[5]),
        content: campaign[3],
        title:
          '<b style="font-size: 0.75em">' +
          campaign[3] +
          "</b>" +
          "<br>" +
          campaign[5] +
          " - Ei määritettyä päättymisaikaa", //title = Tooltipin sisältö
        className: "paused"
      };
    } else if (campaign[4] !== "ACTIVE")
      return {
        group: 2,
        id: campaign[0],
        status: campaign[4],
        start: new Date(campaign[5]),
        end: new Date(campaign[6]),
        content: campaign[3],
        className: "paused",
        title:
          '<b style="font-size: 0.75em">' +
          campaign[3] +
          "</b>" +
          "<br>" +
          campaign[5] +
          " - " +
          campaign[6]
      };
    else if (campaign[6] === undefined)
      return {
        group: 2,
        id: campaign[0],
        status: campaign[4],
        start: new Date(campaign[5]),
        end: new Date(),
        content: campaign[3],
        title:
          '<b style="font-size: 0.75em">' +
          campaign[3] +
          "</b>" +
          "<br>" +
          campaign[5] +
          " - Ei määritettyä päättymisaikaa", //title = Tooltipin sisältö
        className: "activeli"
      };
    else
      return {
        group: 2,
        id: campaign[0],
        status: campaign[4],
        start: new Date(campaign[5]),
        end: new Date(campaign[6]),
        content: campaign[3],
        title:
          '<b style="font-size: 0.75em">' +
          campaign[3] +
          "</b>" +
          "<br>" +
          campaign[5] +
          " - " +
          campaign[6],
        className: "activeli"
      };
  });

  let notes = campaignData.notes.map(campaign => {
    return {
      group: 3,
      id: campaign[0],
      status: campaign[4],
      start: new Date(campaign[5]),
      end: new Date(campaign[6]),
      content: campaign[3],
      title:
        '<b style="font-size: 0.75em">' +
        campaign[3] +
        "</b>" +
        "<br>" +
        campaign[5] +
        " - " +
        campaign[6], //title = Tooltipin sisältö
      text: campaign[7],
      className: "note"
    };
  });

  // From VisTimeline.js
  // ______________________________________________________________________________________________________

  let fbAdData = campaignData.facebookAdData;
  let gAdData = campaignData.googleAdData;

  let info = document.getElementById("info-box");
  let infoContent = document.getElementById("info-content");

  function getUniqueFB(fbAdData, comp) {
    //Turhien toistojen poisto facebook ad info näkymästä
    const uniqueFB = fbAdData
      .map(e => e[comp])

      // store the keys of the unique objects
      .map((e, i, final) => final.indexOf(e) === i && i)

      // eliminate the dead keys & store unique objects
      .filter(e => fbAdData[e])
      .map(e => fbAdData[e]);

    return uniqueFB;
  }
  function getUniqueG(gAdData, comp) {
    //Turhien toistojen poisto google ad info näkymästä
    const uniqueG = gAdData
      .map(e => e[comp])

      // store the keys of the unique objects
      .map((e, i, final) => final.indexOf(e) === i && i)

      // eliminate the dead keys & store unique objects
      .filter(e => gAdData[e])
      .map(e => gAdData[e]);

    return uniqueG;
  }

  document.getElementById("timeline", "info-box button").onclick = function (
    event
  ) {
    if (
      event.target.classList.contains("vis-item") ||
      event.target.classList.contains("vis-item-content")
    ) {
      infoContent.innerHTML = "";
      info.style.display = "block";

      // Facebookin mainosinfon teko
      getUniqueFB(fbAdData, [5]).map(campaign => {
        if (campaign[4].includes(event.target.innerText)) {
          if (campaign[9] === undefined) {
            infoContent.innerHTML +=
              "<li><b>Mainos: " +
              campaign[7] +
              "</b></li><p>" +
              campaign[8] +
              "</p>";
          } else {
            infoContent.innerHTML +=
              "<li><b>Mainos: " +
              campaign[7] +
              "</b></li><p>" +
              campaign[8] +
              "</p><img src='" +
              campaign[9] +
              "'/>";
          }
        }
        return null;
      });

      // Googlen mainosinfon teko
      getUniqueG(gAdData, [5]).map(campaign => {
        if (campaign[4].includes(event.target.innerText)) {
          if (campaign[7] === " --" && campaign[9] === " --") {
            infoContent.innerHTML +=
              "<li><b>Mainosryhmä: " +
              campaign[6] +
              "</b></li><p>" +
              campaign[8] +
              "</p>";
          } else if (campaign[7] === " --") {
            infoContent.innerHTML +=
              "<li><b>Mainosryhmä: " +
              campaign[6] +
              "</b></li><p>" +
              campaign[8] +
              "</p><img src='" +
              campaign[9] +
              "'/>";
          } else if (campaign[9] === " --") {
            infoContent.innerHTML +=
              "<li><b>Mainosryhmä: " +
              campaign[6] +
              "</b></li><p>" +
              campaign[8] +
              "</p>";
          } else {
            infoContent.innerHTML +=
              "<li><b>Mainos: " +
              campaign[7] +
              "</b></li><p>" +
              campaign[8] +
              "</p><img src='" +
              campaign[9] +
              "'/>";
          }
        }
        return null;
      });

      // Client note info box
      notes.map(note => {
        if (note.content === event.target.innerText) {
          infoContent.innerHTML +=
            "<b> " + note.content + "</b><p>" + note.text + "</p>";
        }
        return null;
      });
    }
  };

  //let campaigns = this.props.notes;
  // Google ja FB kampanjat samaan muuttujaan + aktiivisten kampanjoiden filtteröinti
  let campaigns = [...gcampaigns, ...fbcampaigns, ...licampaigns];

  campaigns = campaigns.filter(
    campaign =>
      campaign.status === "enabled" ||
      campaign.status === "ACTIVE" ||
      campaign.status === "paused" ||
      campaign.status === "PAUSED" ||
      campaign.status === "COMPLETED"
  );

  campaigns = [...campaigns, ...notes]; // , ...this.props.posts

  let activeCampaigns = campaigns.filter(
    campaign =>
      campaign.status === "enabled" ||
      campaign.status === "ACTIVE" ||
      campaign.status === "auki"
  );

  // DOM element where the Timeline will be attached
  var container = document.getElementById("timeline");

  // Aktiivisten kampanjoiden asetus timeline-itemeiksi
  let items;
  if (oldcampaigns === false) {
    items = activeCampaigns;
  } else {
    items = campaigns;
  }

  // Make groups for items (items' grouping is already done in campaigntimeline index.js)
  let groups = [
    { id: 0, content: "Google" },
    { id: 1, content: "Facebook" },
    { id: 2, content: "LinkedIn" },
    { id: 3, content: "Omat merkinnät" }
  ];

  // Configuration for the Timeline
  var options = {
    tooltip: { followMouse: true },
    zoomMax: 100000000000,
    zoomMin: 1300000000,
    start: new Date(new Date() - 24 * 60 * 60 * 1000 * 7), // nykyinen pvm - 7pv
    end: new Date(new Date() - 24 * 60 * 60 * 1000 * 1)
  };

  // Create a Timeline
  var timeline = new vis.Timeline(container, items, groups, options);
};

closeAdData = () => {
  document.getElementById("info-box").style.display = "none";
};

// toggleOldCampaings = () => console.log('toggleOldCampaings')

toggleOldCampaings = () => {
  if (oldcampaigns == false) {
    document.getElementById("toggleactivebtn").innerHTML = "Piilota";
  } else if (oldcampaigns == true) {
    document.getElementById("toggleactivebtn").innerHTML = "Näytä";
  }
  //Vanhojen kampanjoiden näyttäminen
  oldcampaigns = !oldcampaigns;
  handleCampaignData(finalcampaigns);
};

openForm = () => {
  alert('AAAAAAAAA! Close me right now!!!')
};

// openForm = () => {
//   window.open(
//     "https://bislenz.com/markkinointi_docendoBn=BR9qgkA/lomakeSt+Y2AR$.html"
//   );
// };

// /* openForm = () => {
//       window.open(
//         "https://bislenz.com/markkinointi_arenaR4P5(w+nGR/lomake=Tgta54$.html"
//       );
//     }; */
