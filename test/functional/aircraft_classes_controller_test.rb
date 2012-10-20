require 'test_helper'

class AircraftClassesControllerTest < ActionController::TestCase
  setup do
    @aircraft_class = aircraft_classes(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:aircraft_classes)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create aircraft_class" do
    assert_difference('AircraftClass.count') do
      post :create, :aircraft_class => @aircraft_class.attributes
    end

    assert_redirected_to aircraft_class_path(assigns(:aircraft_class))
  end

  test "should show aircraft_class" do
    get :show, :id => @aircraft_class.to_param
    assert_response :success
  end

  test "should get edit" do
    get :edit, :id => @aircraft_class.to_param
    assert_response :success
  end

  test "should update aircraft_class" do
    put :update, :id => @aircraft_class.to_param, :aircraft_class => @aircraft_class.attributes
    assert_redirected_to aircraft_class_path(assigns(:aircraft_class))
  end

  test "should destroy aircraft_class" do
    assert_difference('AircraftClass.count', -1) do
      delete :destroy, :id => @aircraft_class.to_param
    end

    assert_redirected_to aircraft_classes_path
  end
end
