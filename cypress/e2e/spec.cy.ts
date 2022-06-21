export interface ARFileEntry {
  url: string;
  label: string;
}

const ARLibrary: ARFileEntry[] = [];

const parseToFile = () => {
  let url;

  // Get AR url
  cy.get(
    ".ug-sidebar.ug-sidebar-right.ug-sidebar-desktop > div:nth-child(2) > div.ug-image-info-box > div:nth-child(8) > span:nth-child(2) > a"
  )
    .then(($el) => {
      if ($el.prop("href").endsWith(".usdz")) {
        url = $el.prop("href");
        cy.log("Link found: ", $el.prop("href"));
      }
    })
    .then(() => {
      // Get AR label
      cy.get(
        ".ug-sidebar.ug-sidebar-right.ug-sidebar-desktop > div:nth-child(2) > div.ug-image-info-box > div:nth-child(3)"
      )
        .then(($el) => {
          if (url) {
            ARLibrary.push({
              url: url.trim().toLowerCase(),
              label: $el.text().trim().toLowerCase(),
            });
          }
        })
        .then(() => {
          // Write to file
          if (ARLibrary && ARLibrary.length > 0) {
            cy.log(JSON.stringify(ARLibrary));
            cy.writeFile("src/ar-objects.json", JSON.stringify(ARLibrary));
          } else {
            cy.log("No AR found", ARLibrary);
          }
        });
    })
    .then(() => {
      // Recurse
      cy.get("a.user-gallery-next_photo").then(($el) => {
        cy.visit($el.prop("href")).then(() => parseToFile());
      });
    });
};

describe("empty spec", () => {
  it("passes", () => {
    // Open website
    cy.visit(Cypress.env("source_url"));

    // Open first gallery item
    cy.get(".user-gallery-wrap div.imagebox > a").then(($el) => {
      cy.visit($el.prop("href")).then(() => parseToFile());
    });
  });
});
