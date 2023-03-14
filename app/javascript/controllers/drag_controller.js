import { Controller } from "@hotwired/stimulus";
import Rails from "rails-ujs";
import Sortable from "sortablejs";

// Connects to data-controller="drag"
export default class extends Controller {
  connect() {
    console.log("Connected to Sortable JS");

    console.log(this.element);

    this.sortable = Sortable.create(this.element, {
      onEnd: this.end.bind(this),
    });
  }

  end(event) {
    console.log(event);

    let id = event.item.dataset.id;
    console.log(id);

    let data = new FormData();
    data.append("position", event.newIndex + 1);

    for (const [key, value] of data.entries()) {
      console.log(`${key}: ${value}`);
    }

    Rails.ajax({
      url: this.data.get("url").replace(":id", id),
      type: "PATCH",
      data: data,
    });
  }
}
