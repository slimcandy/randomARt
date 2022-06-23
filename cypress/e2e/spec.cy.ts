import { IARFileEntry } from "../../src/types";

const ARLibrary: IARFileEntry[] = [];

const parseToFile = async () => {
  const AREntry: IARFileEntry = {};
  await cy
    .get(
      ".ug-sidebar.ug-sidebar-right.ug-sidebar-desktop > div:nth-child(2) > div.ug-image-info-box"
    )
    .as("info-box");

  // Preview Image
  await cy
    .get(".zip > a > img")
    .invoke("attr", "src")
    .then((src) => {
      AREntry.previewImg = src;
    });

  // username
  await cy
    .get("@info-box")
    .find("div:nth-child(1)")
    .invoke("text")
    .as("username")
    .then((username) => {
      AREntry.username = username.trim().toLowerCase();
    });

  // label
  await cy
    .get("@info-box")
    .find("div:nth-child(3)")
    .invoke("text")
    .as("label")
    .then((label) => {
      AREntry.label = label.trim().toLowerCase();
    });

  // url
  await cy
    .get("@info-box")
    .find("div:nth-child(8) > span:nth-child(2) > a")
    .invoke("attr", "href")
    .as("url")
    .then((url) => {
      if (url.endsWith(".usdz")) {
        AREntry.url = url.trim().toLowerCase();
        cy.log("Link found: ", url);
      }
    })
    // Push object to Library
    .then(() => {
      if (AREntry.url) {
        ARLibrary.push(AREntry);
      }
    })
    // Write to file
    .then(() => {
      if (ARLibrary && ARLibrary.length > 0) {
        cy.log(JSON.stringify(ARLibrary));
        cy.writeFile("src/ar-objects.json", JSON.stringify(ARLibrary));
      } else {
        cy.log("No AR found", ARLibrary);
      }
    })
    // Get next Url
    .then(() => {
      cy.get("a.user-gallery-next_photo")
        .invoke("attr", "href")
        .as("next_url")
        // Invoke recursion
        .then((next_url) => {
          cy.visit(next_url).then(() => parseToFile());
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
