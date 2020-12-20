import { HttplayerService } from './services/httplayer.service';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  implements OnInit {
  title = 'cocktailui';
  cocktails = []
  isCocktailDataLoaded :Boolean = false
  modalRef: BsModalRef;
  categories = []
  ingredients = []
  categoryFiltertType = 'category'
  ingredientsFilterType = 'ingredients'
  cocktailNameFilterType = 'cocktail name'
  filterByOptions = []
  selectedFilterBy = ''
  selectedAvailableOptions = []
  selectedFilterValue  : any
  cocktailNameInput = ''
  filterPhpTxt = 'filter.php?'
  searchPhpTxt='search.php?'


  constructor(private httplayer : HttplayerService,private modalService: BsModalService)
  {}

  ngOnInit() {
    this.selectedFilterValue = -1
    this.setFilterByOptions()
    this.getCategories()
    this.getIngredients()
  }

  setFilterByOptions()
  {
    this.selectedFilterBy = this.categoryFiltertType
    this.filterByOptions.push(this.categoryFiltertType)
    this.filterByOptions.push(this.ingredientsFilterType)
    this.filterByOptions.push(this.cocktailNameFilterType)
  }
  
  async getCocktails(filterTxt)
  {
    this.isCocktailDataLoaded = false
     let result = await this.httplayer.getCocktails(filterTxt).toPromise();
    if (result["status"] === 200) {
      let response = JSON.parse(result["body"]);
      this.cocktails = response['drinks']
      console.log(this.cocktails)
      this.isCocktailDataLoaded = true
    }
  }

  async getCategories()
  {
    let result = await this.httplayer.getCategories().toPromise();
    if (result["status"] === 200) {
      let response = JSON.parse(result["body"]);
      this.categories = response['drinks']
      this.setCategoryOptions()
      console.log(this.categories)
    }
  }

  async getIngredients()
  {
    let result = await this.httplayer.getIngredients().toPromise();
    if (result["status"] === 200) {
      let response = JSON.parse(result["body"]);
      this.ingredients = response['drinks']
      console.log(this.ingredients)
    }

  }


  openFilterModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template,Object.assign({}, { class: 'gray modal-lg' })
    );
  }

  onChangeOfFilterByInput()
  {
    this.selectedFilterValue = -1
    if(this.selectedFilterBy == this.categoryFiltertType)
    {
      this.setCategoryOptions()
    }
    if(this.selectedFilterBy == this.ingredientsFilterType)
    {
      this.setIngredientsOptions()
    }
    if(this.selectedFilterBy == this.cocktailNameFilterType)
    {
       this.cocktailNameInput = ''
    }
  }

  setCategoryOptions()
  {
    this.selectedAvailableOptions = []
    for(let i=0;i<this.categories.length;i++)
    {
      this.selectedAvailableOptions.push(this.categories[i]['strCategory'])
    }
  }

  setIngredientsOptions()
  {
    this.selectedAvailableOptions = []
    for(let i=0;i<this.ingredients.length;i++)
    {
      this.selectedAvailableOptions.push(this.ingredients[i]['strIngredient1'])
    }
  }

  filterAppliedClick()
  {
      if(this.validateFilterValues())
      {
        this.modalRef.hide()
        if(this.selectedFilterBy == this.categoryFiltertType || this.selectedFilterBy == this.ingredientsFilterType)
        {
          this.handleCategoryOrIngredientsFilter()
        }
        else
        {
          this.handleCocktailTxtFilter()
        }
      }
  }

  validateFilterValues()
  {
    if(this.selectedFilterBy == this.categoryFiltertType || this.selectedFilterBy == this.ingredientsFilterType)
    {
      if(this.selectedFilterValue == -1)
      {
        alert('please select an option')
        return false
      }
    }
    if(this.selectedFilterBy == this.categoryFiltertType)
    {
      if(this.selectedFilterValue == -1)
      {
        alert('please select an option')
        return false
      }
    }
    if(this.selectedFilterBy == this.cocktailNameFilterType)
    {
      if(this.cocktailNameInput == '')
      {
        alert('text cannot be empty')
        return false
      }
    }
    return true
  }

  handleCategoryOrIngredientsFilter()
  {

    let searchQueryParams = ''
    let selectedTxt = ''
    if(this.selectedFilterBy == this.categoryFiltertType)
    {
      selectedTxt='c'
    }
    else
    {
      selectedTxt = 'i'
    }
    searchQueryParams = this.filterPhpTxt+selectedTxt+"="+this.selectedFilterValue
    this.getCocktails(searchQueryParams)
  }

  handleCocktailTxtFilter()
  {
     let searchQueryParams = ''
     searchQueryParams = this.searchPhpTxt+"s="+this.cocktailNameInput
     this.getCocktails(searchQueryParams)
  }

}


