Antcc::Application.routes.draw do
  
  resources :sub_classes

  resources :helo_classes

  resources :aircraft_classes

  resources :ship_classes

  resources :vehicle_models

  root :to => "articles#index"
  resources :articles do
    member do
      post :notify_friend
    end
    resources :comments
  end
  resources :users do
    member do
      post :email_geoscontact
    end
  end
  resources :profiles

  resource :session
  match '/login' => "sessions#new", :as => "login"
  match '/logout' => "sessions#destroy", :as => "logout"
  match '/list' => "tracks#list", :as => "list"
  match '/create' => "tracks#create"
  match '/destroy/:id' => "tracks#destroy"
  match '/update/:id' => "tracks#update"
  match '/updatepostime/:id' => "tracks#updatepostime"
  match '/geosmaps/:id/display' => "geosmaps#display"
  match '/geosmaps/:id/currentmap' => "geosmaps#currentmap"
  match '/geosmaps/:id/update' => "geosmaps#update"
  match '/geosmaps/:id/save' => "geosmaps#save"
  match '/geosmaps/:id/list' => "tracks#list"
  match '/geosmaps/:id/listmarkers' => "geosmarkers#list"
  match '/geosmaps/:id/create' => "tracks#create"
  match '/geosmaps/:id/createmarker' => "geosmarkers#create"
  match '/geosmaps/:id/destroy/:id' => "tracks#destroy"
  match '/geosmaps/:id/destroymarker/:id' => "geosmarkers#destroy"
  match '/geosmaps/:id/update/:id' => "tracks#update"
  match '/geosmaps/:id/updatemarker/:id' => "geosmarkers#update"
  match '/geosmaps/:id/updatepostime/:id' => "tracks#updatepostime"
  match '/geosmaps/:id/listcircles' => "geoscircles#list"
  match '/geosmaps/:id/createcircle' => "geoscircles#create"
  match '/geosmaps/:id/destroycircle/:id' => "geoscircles#destroy"
  match '/geosmaps/:id/updatecircle/:id' => "geoscircles#update"
  match '/geosmaps/:id/listrectangles' => "geosrectangles#list"
  match '/geosmaps/:id/createrectangle' => "geosrectangles#create"
  match '/geosmaps/:id/destroyrectangle/:id' => "geosrectangles#destroy"
  match '/geosmaps/:id/updaterectangle/:id' => "geosrectangles#update"
  match '/geosmaps/:id/listpolygons' => "geospolygons#list"
  match '/geosmaps/:id/createpolygon' => "geospolygons#create"
  match '/geosmaps/:id/destroypolygon/:id' => "geospolygons#destroy"
  match '/geosmaps/:id/updatepolygon/:id' => "geospolygons#update"
  match '/geosmaps/:id/listpolylines' => "geospolylines#list"
  match '/geosmaps/:id/createpolyline' => "geospolylines#create"
  match '/geosmaps/:id/destroypolyline/:id' => "geospolylines#destroy"
  match '/geosmaps/:id/updatepolyline/:id' => "geospolylines#update"
  resources :geosmaps do
   resources :tracks
   resources :geosmarkers
   resources :geoscircles
   resources :geosrectangles
   resources :geospolygons
   resources :geospolylines
  end
  # match '/geosmaps/:id/list'  => "tracks/list"
  # The priority is based upon order of creation:
  # first created -> highest priority.

  # Sample of regular route:
  #   match 'products/:id' => 'catalog#view'
  # Keep in mind you can assign values other than :controller and :action

  # Sample of named route:
  #   match 'products/:id/purchase' => 'catalog#purchase', :as => :purchase
  # This route can be invoked with purchase_url(:id => product.id)

  # Sample resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Sample resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Sample resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Sample resource route with more complex sub-resources
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', :on => :collection
  #     end
  #   end

  # Sample resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end

  # You can have the root of your site routed with "root"
  # just remember to delete public/index.html.
  # root :to => "welcome#index"

  # See how all your routes lay out with "rake routes"

  # This is a legacy wild controller route that's not recommended for RESTful applications.
  # Note: This route will make all actions in every controller accessible via GET requests.
  # match ':controller(/:action(/:id(.:format)))'
end
