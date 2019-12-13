<?php

namespace App\Http\Controllers;

use App\Node;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class NodeController extends Controller
{

	public $validationRules = [
		'title'    => 'string|required|max:1000',
		'content'  => 'string',
		'lefts'    => 'nullable|array',
		'rights'   => 'nullable|array',
		'lefts.*'  => 'numeric|exists:nodes,id',
        'rights.*' => 'numeric|exists:nodes,id',
        'users'    => 'nullable|array',
        'users.*'  => 'numeric|exists:users,id',
	];


    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
	    return response(Node::all(), 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
	    $request->validate($this->validationRules);

	    $slug = Str::slug($request->title);
	    $existing = Node::where('slug', $slug)->get()->count();
	    if ($existing) $slug.= '-' . ($existing + 1);

	    $node = Node::create([
	    	'title'      => $request->title,
            'content'    => $request->content ?? '',
            'slug'       => $slug,
            'created_by' => $request->user()->id,
        ]);
        
	    if ($request->lefts)  $node->lefts() ->sync($request->lefts);
        if ($request->rights) $node->rights()->sync($request->rights);
        
        if ($request->users)  $node->users() ->sync($request->users);

	    return response($node, 200);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Node  $node
     * @return \Illuminate\Http\Response
     */
    public function show(Node $node)
    {
        return response($node, 200);
    } 

    /**
     * Display the specified resource by its slug.
     *
     * @param  string  $slug
     * @return \Illuminate\Http\Response
     */
    public function showBySlug($slug)
    {
	$node = Node::where('slug', $slug)->first();

	if ($node) return response($node, 200);
	else return abort(404);
    }
    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Node  $node
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Node $node)
    {
	    $request->validate($this->validationRules);

	    $slug = Str::slug($request->title);
	    $existing = Node::where('slug', $slug)->get()->count();
	    if ($existing) $slug.= '-' . ($existing + 1);

	    $node->fill([
	    	'title'   => $request->title,
            'content' => $request->content ?? '',
            'slug'    => $slug,
	    ])->save();

	    if ($request->lefts)  $node->lefts() ->sync($request->lefts);
        if ($request->rights) $node->rights()->sync($request->rights);
        
        if ($request->users)  $node->users() ->sync($request->users);

	    return response($node, 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Node  $node
     * @return \Illuminate\Http\Response
     */
    public function destroy(Node $node)
    {
	    $node->delete();

	    return response($node, 200);
    }
}
