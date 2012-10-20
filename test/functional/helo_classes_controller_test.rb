require 'test_helper'

class HeloClassesControllerTest < ActionController::TestCase
  setup do
    @helo_class = helo_classes(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:helo_classes)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create helo_class" do
    assert_difference('HeloClass.count') do
      post :create, :helo_class => @helo_class.attributes
    end

    assert_redirected_to helo_class_path(assigns(:helo_class))
  end

  test "should show helo_class" do
    get :show, :id => @helo_class.to_param
    assert_response :success
  end

  test "should get edit" do
    get :edit, :id => @helo_class.to_param
    assert_response :success
  end

  test "should update helo_class" do
    put :update, :id => @helo_class.to_param, :helo_class => @helo_class.attributes
    assert_redirected_to helo_class_path(assigns(:helo_class))
  end

  test "should destroy helo_class" do
    assert_difference('HeloClass.count', -1) do
      delete :destroy, :id => @helo_class.to_param
    end

    assert_redirected_to helo_classes_path
  end
end
